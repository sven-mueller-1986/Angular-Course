using ShoppingList.Api.Dto;

namespace ShoppingList.Api.Models;

public class ShoppingListModel
{
    public ShoppingListModel(ICollection<Ingredient> ingredients, Guid? id)
    {
        Id = id;
        Ingredients = ingredients;
    }

    public ShoppingListModel() { }

    public Guid? Id { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; }
}
