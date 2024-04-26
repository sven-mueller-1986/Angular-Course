using Microsoft.EntityFrameworkCore;
using ShoppingList.Api.Models;
using System.Reflection;

namespace ShoppingList.Api.Data;

public class AppDatabaseContext : DbContext, IAppDatabaseContext
{
    public AppDatabaseContext(DbContextOptions<AppDatabaseContext> options) : base(options)
    { }

    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<ShoppingListModel> ShoppingLists { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(builder);
    }
}
