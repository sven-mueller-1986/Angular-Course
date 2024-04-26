using System.Text.Json.Serialization;

namespace ShoppingList.Api.Dto;

public class IngredientDto
{
    [JsonPropertyName("id")]
    public Guid? Id { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("amount")]
    public float? Amount { get; set; }

    [JsonPropertyName("unit")]
    public string? Unit { get; set; }
}
