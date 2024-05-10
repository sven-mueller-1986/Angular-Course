using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using ShoppingList.Api.Security;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddScoped<IAppDatabaseContext, AppDatabaseContext>();

builder.Services.AddCarter();
TypeAdapterConfig.GlobalSettings.Scan(Assembly.GetExecutingAssembly());

var connectionString = builder.Configuration.GetConnectionString("Database");

ArgumentException.ThrowIfNullOrWhiteSpace(connectionString, "Database ConnectionString needs to be set.");

builder.Services.AddDbContext<AppDatabaseContext>((provider, options) =>
{
    options.UseNpgsql(connectionString);
});

var identityServerUrl = builder.Configuration["Apis:Identity"];

ArgumentException.ThrowIfNullOrWhiteSpace(identityServerUrl, "Identity Server URL needs to be set.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = identityServerUrl;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidTypes = ["at+jwt"],
            ClockSkew = TimeSpan.Zero,
        };
    });

builder.Services.AddAuthorization(pb =>
{
    pb.DefaultPolicy = new AuthorizationPolicyBuilder()        
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .RequireClaim("scope", "ShoppingListAPI.read")
        .Build();

    pb.AddPolicy(SecurityPolicies.Write, apb => apb
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
        .RequireAuthenticatedUser()
        .RequireClaim("scope", "ShoppingListAPI.read")
        .RequireClaim("scope", "ShoppingListAPI.write"));
});

var app = builder.Build();

// Pipeline Configuration

if (app.Environment.IsDevelopment())
{
    await app.InitialiseDatabaseAsync();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapCarter();

app.Run();
