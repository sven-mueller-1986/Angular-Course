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

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Development", policy =>
    {
        policy
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
        
    });
});

var app = builder.Build();

// Pipeline Configuration

app.MapCarter();

if (app.Environment.IsDevelopment())
{
    app.UseCors("Development");

    await app.InitialiseDatabaseAsync();
}

app.Run();
