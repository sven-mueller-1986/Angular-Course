namespace ShoppingList.Api.Mappings;

public class RecipeMap : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<RecipeDto, Recipe>()
            .Map(dest => dest.Id, src => src.Id)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Description, src => src.Description)
            .Map(dest => dest.ImagePath, src => src.ImagePath)
            .Map(dest => dest.Ingredients, src => src.Ingredients.Adapt<List<Ingredient>>());
    }
}
