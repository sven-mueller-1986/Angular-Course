using Carter;
using IdentityModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Yarp.ReverseProxy.Transforms;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"))
    .AddTransforms(tbc =>
    {
        tbc.AddRequestTransform(async rtc =>
        {
            var token = await rtc.HttpContext.GetTokenAsync("access_token");

            if (string.IsNullOrWhiteSpace(token))
                return;

            rtc.ProxyRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        });
    });

builder.Services.AddSpaStaticFiles(config =>
{
    config.RootPath = "wwwroot/browser";
});

builder.Services.AddCarter();

var identityApiUrl = builder.Configuration["Apis:Identity"];
ArgumentException.ThrowIfNullOrWhiteSpace(identityApiUrl);

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
    {
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.IsEssential = true;
    })
    .AddOpenIdConnect("Identity-Server", options =>
    {
        options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

        options.Authority = identityApiUrl;

        options.ClientId = "b5fd40a2-5ab4-44c1-9527-5042908e8210";
        options.ClientSecret = "client-secret-front-end";
        options.ResponseType = OpenIdConnectResponseType.Code;
        options.ResponseMode = OpenIdConnectResponseMode.Query;
        options.UsePkce = true;

        options.Scope.Add("email");
        options.Scope.Add("openid");
        options.Scope.Add("profile");
        options.Scope.Add("ShoppingListAPI.read");
        options.Scope.Add("ShoppingListAPI.write");
        //options.ClaimActions.MapUniqueJsonKey("role", "role");

        options.SaveTokens = true;

        options.CallbackPath = new PathString("/api/signin-oidc");
        options.SignedOutCallbackPath = new PathString("/api/signout-callback-oidc");
        options.RemoteAuthenticationTimeout = TimeSpan.FromMinutes(5);
        options.GetClaimsFromUserInfoEndpoint = true;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = JwtClaimTypes.Email
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Development", policy =>
    {
        policy
        .WithOrigins(identityApiUrl)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseCors("Development");
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapCarter();
app.MapReverseProxy();

app.UseStaticFiles();
app.UseSpaStaticFiles();
app.UseSpa(config => { });

app.Run();
