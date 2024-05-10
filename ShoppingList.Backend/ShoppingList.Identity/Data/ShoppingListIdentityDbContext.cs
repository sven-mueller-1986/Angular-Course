namespace ShoppingList.Identity.Data;

public class ShoppingListIdentityDbContext : IdentityDbContext
{
    public ShoppingListIdentityDbContext(DbContextOptions<ShoppingListIdentityDbContext> options)
        : base(options)
    { }
}
