using Carter;
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Mvc;
using ShoppingList.Identity.Handlers;

namespace ShoppingList.Identity.Endpoints;

public class Account : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/login", AccountHandler.LoginAsync);
        app.MapPost("/api/logout", AccountHandler.LogoutAsync);
        app.MapPost("/api/register", AccountHandler.RegisterAsync);
        app.MapGet("/api/error", async ([FromQuery] string errorId, IIdentityServerInteractionService interactionService) =>
        {
            var errorMessage = await interactionService.GetErrorContextAsync(errorId);

            return Results.Ok(errorMessage);
        });
    }
}
