using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using ShoppingList.Api.Models;

namespace ShoppingList.Api.Data;

public interface IAppDatabaseContext
{
    DbSet<Recipe> Recipes { get; }
    DbSet<ShoppingListModel> ShoppingLists { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
