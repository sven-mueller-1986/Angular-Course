namespace ShoppingList.Api.Endpoints;

public class ShoppingList : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/shopping-list", async (IAppDatabaseContext database) =>
        {
            var shoppingLists = await database.ShoppingLists.ToListAsync();

            return Results.Ok(shoppingLists.Adapt<List<ShoppingListDto>>());
        });

        app.MapGet("/api/shopping-list/{id}", async (Guid id, IAppDatabaseContext database) =>
        {
            var shoppingList = await database.ShoppingLists.Include(x => x.Ingredients).FirstOrDefaultAsync(x => x.Id == id);

            if (shoppingList is null)
                return Results.NotFound();

            return Results.Ok(shoppingList.Adapt<ShoppingListDto>());
        });

        app.MapPost("/api/shopping-list", async (ShoppingListDto shoppingListDto, IAppDatabaseContext database) =>
        {
            var shoppingList = shoppingListDto.Adapt<ShoppingListModel>();

            var createdShoppingList = await database.ShoppingLists.AddAsync(shoppingList);
            await database.SaveChangesAsync();

            return Results.Created($"/api/shopping-list/{createdShoppingList.Entity.Id}", createdShoppingList.Entity.Adapt<ShoppingListDto>());
        });

        app.MapPut("/api/shopping-list/{id}", async (Guid id, ShoppingListDto shoppingListDto, IAppDatabaseContext database) =>
        {
            var shoppingList = shoppingListDto.Adapt<ShoppingListModel>();
            var existingShoppingList = await database.ShoppingLists.Include(x => x.Ingredients).FirstOrDefaultAsync(x => x.Id == id);

            if (existingShoppingList is null)
                return Results.NotFound();

            existingShoppingList.Ingredients = shoppingList.Ingredients;

            await database.SaveChangesAsync();

            return Results.Ok();
        });

        app.MapDelete("/api/shopping-list/{id}", async (Guid id, IAppDatabaseContext database) =>
        {
            var shoppingList = await database.ShoppingLists.Include(x => x.Ingredients).FirstOrDefaultAsync(x => x.Id == id);

            if (shoppingList is null)
                return Results.NotFound();

            database.ShoppingLists.Remove(shoppingList);
            await database.SaveChangesAsync();

            return Results.Ok(shoppingList.Adapt<ShoppingListDto>());
        });
    }
}
