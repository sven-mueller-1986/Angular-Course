using Duende.IdentityServer.EntityFramework.DbContexts;
using Duende.IdentityServer.EntityFramework.Mappers;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace ShoppingList.Identity.Data;

public static class DatabaseExtensions
{
    public static async Task InitialiseDatabaseAsync(this WebApplication app, bool seedData = false)
    {
        using var scope = app.Services.CreateScope();

        var persistentGrantContext = scope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>();
        var configurationContext = scope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
        var identityContext = scope.ServiceProvider.GetRequiredService<ShoppingListIdentityDbContext>();

        await persistentGrantContext.Database.MigrateAsync();
        await configurationContext.Database.MigrateAsync();
        await identityContext.Database.MigrateAsync();

        if (!seedData)
            return;

        await SeedAsync(persistentGrantContext);
        await SeedAsync(configurationContext);
        await SeedAsync(identityContext, scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>());
    }

    private static async Task SeedAsync(ShoppingListIdentityDbContext identityContext, UserManager<IdentityUser> userManager)
    {
        var testUser = await userManager.FindByNameAsync("Andi.Arbeit@test.com");

        if(testUser is not null)
        {
            await userManager.DeleteAsync(testUser);
        }
            
        testUser = new IdentityUser
        {
            UserName = "Andi.Arbeit@test.com",
            Email = "Andi.Arbeit@test.com",
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(testUser, "Test123!");
        if (!result.Succeeded)
            throw new Exception(result.Errors.First().Description);

        result = await userManager.AddClaimsAsync
            (
                testUser,
                [
                    new Claim(JwtClaimTypes.Name, "Andi Arbeit"),
                    new Claim(JwtClaimTypes.GivenName, "Andi"),
                    new Claim(JwtClaimTypes.FamilyName, "Arbeit")
                ]
            );
        if (!result.Succeeded)
            throw new Exception(result.Errors.First().Description);
    }

    private static async Task SeedAsync(ConfigurationDbContext configurationContext)
    {
        if (configurationContext.Clients.Any())
        {
            configurationContext.Clients.RemoveRange(configurationContext.Clients);

            await configurationContext.SaveChangesAsync();
        }

        foreach (var client in IdentityServerConfig.Clients)
        {
            await configurationContext.Clients.AddAsync(client.ToEntity());
        }

        await configurationContext.SaveChangesAsync();

        if (configurationContext.IdentityResources.Any())
        {
            configurationContext.IdentityResources.RemoveRange(configurationContext.IdentityResources);

            await configurationContext.SaveChangesAsync();
        }

        foreach (var resource in IdentityServerConfig.IdentityResources)
        {
            await configurationContext.IdentityResources.AddAsync(resource.ToEntity());
        }

        await configurationContext.SaveChangesAsync();

        if (configurationContext.ApiScopes.Any())
        {
            configurationContext.ApiScopes.RemoveRange(configurationContext.ApiScopes);

            await configurationContext.SaveChangesAsync();
        }

        foreach (var scope in IdentityServerConfig.ApiScopes)
        {
            await configurationContext.ApiScopes.AddAsync(scope.ToEntity());
        }

        await configurationContext.SaveChangesAsync();

        if (configurationContext.ApiResources.Any())
        {
            configurationContext.ApiResources.RemoveRange(configurationContext.ApiResources);

            await configurationContext.SaveChangesAsync();
        }

        foreach (var resource in IdentityServerConfig.ApiResources)
        {
            await configurationContext.ApiResources.AddAsync(resource.ToEntity());
        }

        await configurationContext.SaveChangesAsync();
    }

    private static Task SeedAsync(PersistedGrantDbContext persistentGrantContext)
    {
        return Task.CompletedTask;
    }
}
