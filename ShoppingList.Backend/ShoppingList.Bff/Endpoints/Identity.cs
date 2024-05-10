using Carter;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using ShoppingList.Bff.Dtos;

namespace ShoppingList.Bff.Endpoints;

public class Identity : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/identity/login", (string returnUrl = "/") => {

            return Results.Challenge(new AuthenticationProperties()
            {
                RedirectUri = returnUrl
            }, new List<string> { "Identity-Server" });
        });

        app.MapGet("/api/identity/logout", async (HttpContext ctx, string returnUrl = "/") => {

            await ctx.SignOutAsync();
            await ctx.SignOutAsync("Identity-Server", new AuthenticationProperties { RedirectUri = returnUrl });
        });

        app.MapGet("/api/identity/user", (HttpContext ctx) => {

            var identity = ctx.User.Identity;

            if (identity is null)
                return Results.Ok(new User(false));

            var mail = ctx.User.Claims.FirstOrDefault(c => string.Equals(c.Type, "email"))?.Value;
            var lastName = ctx.User.Claims.FirstOrDefault(c => string.Equals(c.Type, "family_name"))?.Value;
            var firstName = ctx.User.Claims.FirstOrDefault(c => string.Equals(c.Type, "given_name"))?.Value;
            return Results.Ok(new User(ctx.User.Identity?.IsAuthenticated ?? false, mail, lastName, firstName));
        });
    }
}
