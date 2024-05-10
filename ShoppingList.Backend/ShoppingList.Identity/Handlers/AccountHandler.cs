using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ShoppingList.Identity.Handlers;

public class AccountHandler
{
    public record LoginInputModel(string UserName, string Password, string? ReturnUrl, bool IsPersistent = false);
    public record LogoutInputModel(string? LogoutId);

    public static async Task<IResult> LoginAsync(
        [FromServices] IIdentityServerInteractionService interactionService,
        [FromServices] IServerUrls serverUrls,
        [FromServices] SignInManager<IdentityUser> signInManager,
        [FromBody] LoginInputModel input)
    {
        var authContext = await interactionService.GetAuthorizationContextAsync(input.ReturnUrl);

        // Redirect after successful login - If there is no Return URL -> navigate somewhere, throw exception, return BadRequest, in this case the Base URL of the identity server is returned.
        var returnUrl = input.ReturnUrl is not null && authContext is not null ? input.ReturnUrl : serverUrls.BaseUrl;

        var result = await signInManager.PasswordSignInAsync(input.UserName, input.Password, input.IsPersistent, true);

        return result.Succeeded ? Results.Json(new { returnUrl }) : Results.BadRequest(result.ToString());
    }

    public static async Task<IResult> LogoutAsync(
        [FromServices] IIdentityServerInteractionService interactionService,
        [FromServices] SignInManager<IdentityUser> signInManager,
        [FromBody] LogoutInputModel input)
    {
        var request = await interactionService.GetLogoutContextAsync(input.LogoutId);

        await signInManager.SignOutAsync();        

        return Results.Json(new { 
            iFrameUrl = request.SignOutIFrameUrl, 
            postLogoutRedirectUri = request.PostLogoutRedirectUri, 
            showSignoutPrompt = request.ShowSignoutPrompt });
    }

    public static async Task<IResult> RegisterAsync(
        [FromServices] IIdentityServerInteractionService interactionService,
        [FromServices] IServerUrls serverUrls,
        [FromServices] UserManager<IdentityUser> userManager,
        [FromServices] SignInManager<IdentityUser> signInManager,
        [FromBody] LoginInputModel input)
    {
        var authContext = await interactionService.GetAuthorizationContextAsync(input.ReturnUrl);

        // Redirect after successful login - If there is no Return URL -> navigate somewhere, throw exception, return BadRequest, in this case the Base URL of the identity server is returned.
        var returnUrl = input.ReturnUrl is not null && authContext is not null ? input.ReturnUrl : serverUrls.BaseUrl;

        var createResult = await userManager.CreateAsync(new IdentityUser
        {
            UserName = input.UserName,
            Email = input.UserName,
            EmailConfirmed = true,
            TwoFactorEnabled = false
        }, input.Password);

        if(!createResult.Succeeded)
        {
            return Results.Problem(createResult.Errors.ToString(), statusCode: 500);
        }

        var loginResult = await signInManager.PasswordSignInAsync(input.UserName, input.Password, input.IsPersistent, true);

        return loginResult.Succeeded ? Results.Json(new { returnUrl }) : Results.BadRequest(loginResult.ToString());
    }
}
