namespace ShoppingList.Api.Data;

public static class DatabaseExtensions
{
    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDatabaseContext>();

        await context.Database.MigrateAsync();

        //await SeedAsync(context);
    }
}
