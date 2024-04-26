namespace ShoppingList.Api.Models;

public class Ingredient
{
    public Ingredient(string name, float amount, string unit, Guid? id)
    {
        Id = id;
        Name = name;
        Amount = amount;
        Unit = unit;
    }

    public Ingredient() { }

    public Guid? Id { get; set; }
    public string Name { get; set; }
    public float Amount { get; set; }
    public string Unit { get; set; }
}
