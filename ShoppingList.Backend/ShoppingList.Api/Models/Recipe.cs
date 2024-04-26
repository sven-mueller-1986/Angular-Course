using ShoppingList.Api.Dto;

namespace ShoppingList.Api.Models;

public class Recipe
{
    public Recipe(string name, string description, string imagePath, ICollection<Ingredient> ingredients, Guid? id)
    {
        Id = id;
        Name = name;
        Description = description;
        ImagePath = imagePath;
        Ingredients = ingredients;
    }

    public Recipe() { }

    public Guid? Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImagePath { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; }
}
