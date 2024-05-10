namespace ShoppingList.Bff.Dtos;

public class User
{
    public User(bool isAuthenticated, string? mail = null, string? lastName = null, string? firstName = null)
    {
        IsAuthenticated = isAuthenticated;
        Mail = mail;
        LastName = lastName;
        FirstName = firstName;
    }

    public bool IsAuthenticated { get; }

    public string? Mail { get; }

    public string? LastName { get; }

    public string? FirstName { get; }
}
