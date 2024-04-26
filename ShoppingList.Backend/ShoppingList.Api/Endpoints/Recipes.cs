namespace ShoppingList.Api.Endpoints;

public class Recipes : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/recipes", async (IAppDatabaseContext database) =>
        {
            var recipes = await database.Recipes.ToListAsync();

            return Results.Ok(recipes.Adapt<List<RecipeDto>>());
        });

        app.MapGet("/api/recipes/{id}", async (Guid id, IAppDatabaseContext database) =>
        {
            var recipe = await database.Recipes.Include(x => x.Ingredients).FirstOrDefaultAsync(x => x.Id == id);

            if(recipe is null)
                return Results.NotFound();

            return Results.Ok(recipe.Adapt<RecipeDto>());
        });

        app.MapPost("/api/recipes", async (RecipeDto recipeDto, IAppDatabaseContext database) =>
        {
            var recipe = recipeDto.Adapt<Recipe>();

            var createdRecipe = await database.Recipes.AddAsync(recipe);
            await database.SaveChangesAsync();

            return Results.Created($"/api/recipes/{createdRecipe.Entity.Id}", createdRecipe.Entity.Adapt<RecipeDto>());
        });

        app.MapPut("/api/recipes/{id}", async (Guid id, RecipeDto recipeDto, IAppDatabaseContext database) =>
        {
            var recipe = recipeDto.Adapt<Recipe>();
            var existingRecipe = await database.Recipes.Include(x => x.Ingredients).FirstOrDefaultAsync(x => x.Id == id);

            if (existingRecipe is null)
                return Results.NotFound();

            existingRecipe.Name = recipe.Name;
            existingRecipe.Description = recipe.Description;
            existingRecipe.ImagePath = recipe.ImagePath;
            existingRecipe.Ingredients = recipe.Ingredients;

            await database.SaveChangesAsync();

            return Results.Ok();
        });

        app.MapDelete("/api/recipes/{id}", async (Guid id, IAppDatabaseContext database) =>
        {
            var recipe = await database.Recipes.Include(x => x.Ingredients).FirstOrDefaultAsync(x => x.Id == id);

            if (recipe is null)
                return Results.NotFound();

            database.Recipes.Remove(recipe);
            await database.SaveChangesAsync();

            return Results.Ok(recipe.Adapt<RecipeDto>());
        });
    }
}
