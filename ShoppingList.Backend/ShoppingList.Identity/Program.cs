using Carter;
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Identity;
using ShoppingList.Identity.Data;
using ShoppingList.Identity.Handlers;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddSpaStaticFiles(config =>
{
    config.RootPath = "wwwroot/browser";
});

builder.Services.AddCarter();

var assemblyName = typeof(Program).Assembly.GetName().Name;
var databaseConnectionString = builder.Configuration.GetConnectionString("Database");

ArgumentException.ThrowIfNullOrWhiteSpace(assemblyName);
ArgumentException.ThrowIfNullOrWhiteSpace(databaseConnectionString);

builder.Services.AddDbContext<ShoppingListIdentityDbContext>(options => options.UseNpgsql(databaseConnectionString, sql => sql.MigrationsAssembly(assemblyName)));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddDefaultTokenProviders()
    .AddEntityFrameworkStores<ShoppingListIdentityDbContext>();

builder.Services.AddIdentityServer(options =>
{
    options.KeyManagement.Enabled = false;

    options.UserInteraction.LoginUrl = "/account/login";
    options.UserInteraction.LoginReturnUrlParameter = "returnUrl";
    options.UserInteraction.LogoutUrl = "/account/logout";
    options.UserInteraction.LogoutIdParameter = "logoutId";
    options.UserInteraction.ErrorUrl = "/error";
    options.UserInteraction.ErrorIdParameter = "errorId";
})
    .AddCorsPolicyService<AppCorsPolicyService>()
    .AddAspNetIdentity<IdentityUser>()
    .AddConfigurationStore(options =>
    {
        options.ConfigureDbContext = context =>
        context.UseNpgsql(databaseConnectionString, sql => sql.MigrationsAssembly(assemblyName));
    })
    .AddOperationalStore(options =>
    {
        options.ConfigureDbContext = context =>
        context.UseNpgsql(databaseConnectionString, sql => sql.MigrationsAssembly(assemblyName));
    })
    .AddDeveloperSigningCredential();

var webAppUrl = builder.Configuration["Apis:WebApp"];

ArgumentException.ThrowIfNullOrWhiteSpace(webAppUrl);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Development", policy =>
    {
        policy
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .SetIsOriginAllowed(origin =>
        {
            if(string.Equals(origin, webAppUrl))
                return true;

            return false;
        });
    });
});

var app = builder.Build();

// Pipeline Configuration

if (app.Environment.IsDevelopment())
{
    app.UseCors("Development");

    await app.InitialiseDatabaseAsync(seedData: true);
}

app.UseRouting();

app.UseIdentityServer();

app.MapCarter();

app.UseStaticFiles();
app.UseSpaStaticFiles();
app.UseSpa(config => { });

app.Run();
