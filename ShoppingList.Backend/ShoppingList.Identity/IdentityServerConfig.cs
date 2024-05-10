using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace ShoppingList.Identity;

public class IdentityServerConfig
{
    public static IEnumerable<IdentityResource> IdentityResources =>
    [
        new IdentityResources.OpenId(),
        new IdentityResources.Profile(),
        new IdentityResources.Email(),
        new IdentityResource
        {
            Name = "role",
            UserClaims = new List<string> { "role" }
        }
    ];

    public static IEnumerable<ApiScope> ApiScopes =>
    [
        new ApiScope("ShoppingListAPI.read"),
        new ApiScope("ShoppingListAPI.write"),
    ];

    public static IEnumerable<ApiResource> ApiResources =>
    [
        new ApiResource("ShoppingListAPI")
        {
            Scopes = new List<string> { "ShoppingListAPI.read", "ShoppingListAPI.write" },
            ApiSecrets = new List<Secret> { new Secret("ScopeSecret".Sha256()) },
            UserClaims = new List<string> { "role" }
        }
    ];

    public static IEnumerable<Client> Clients =>
    [
        new Client 
        {
            ClientId = "a8b6f726-f4d0-4346-bcf8-9877c34d57e6",
            ClientName = "Shopping List API",
            AllowedGrantTypes = GrantTypes.ClientCredentials,
            ClientSecrets = { new Secret("client-secret-back-end".Sha256()) },
            AllowedScopes = { "ShoppingListAPI.read", "ShoppingListAPI.write" }
        },
        new Client
        {
            ClientId = "b5fd40a2-5ab4-44c1-9527-5042908e8210",
            ClientName = "Shopping List Angular",
            AllowedGrantTypes = GrantTypes.Code,
            ClientSecrets = { new Secret("client-secret-front-end".Sha256()) },
            AllowedScopes = 
            {
                IdentityServerConstants.StandardScopes.OpenId, 
                IdentityServerConstants.StandardScopes.Profile,
                IdentityServerConstants.StandardScopes.Email,
                "ShoppingListAPI.read", 
                "ShoppingListAPI.write",  
            },
            RedirectUris = { "https://localhost:7071/api/signin-oidc" },            
            PostLogoutRedirectUris = { "https://localhost:7071/api/signout-callback-oidc" },
            RequirePkce = true,

            //FrontChannelLogoutUri = "https://localhost:7075/signout-oidc",
            //AllowOfflineAccess = true,
            //RequireConsent = false,
            //AllowPlainTextPkce = false
        }
    ];
}
