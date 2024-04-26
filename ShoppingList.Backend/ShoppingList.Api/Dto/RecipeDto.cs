using System.Text.Json.Serialization;

namespace ShoppingList.Api.Dto;

public class RecipeDto
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("imagePath")]
    public string? ImagePath { get; set; }

    [JsonPropertyName("ingredients")]
    public IEnumerable<IngredientDto>? Ingredients { get; set; }
}
