using System.Text.Json.Serialization;

namespace ShoppingList.Api.Dto;

public class ShoppingListDto
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("ingredients")]
    public IEnumerable<IngredientDto>? Ingredients { get; set; }
}
