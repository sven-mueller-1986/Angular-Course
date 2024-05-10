using Duende.IdentityServer.Services;

namespace ShoppingList.Identity.Handlers;

public class AppCorsPolicyService : ICorsPolicyService
{
    public Task<bool> IsOriginAllowedAsync(string origin)
    {
        return Task.FromResult(true);
    }
}
