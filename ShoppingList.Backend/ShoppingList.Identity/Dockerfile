#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ShoppingList.Identity/ShoppingList.Identity.csproj", "ShoppingList.Identity/"]
RUN dotnet restore "./ShoppingList.Identity/ShoppingList.Identity.csproj"
COPY . .
WORKDIR "/src/ShoppingList.Identity"
RUN dotnet build "./ShoppingList.Identity.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ShoppingList.Identity.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM node:current-alpine3.19 as angular
WORKDIR "/src/ShoppingList.Identity.Ui"
COPY "./ShoppingList.Identity.Ui/package.json" "./package.json"
RUN cd ShoppingList.Identity.Ui && npm install
COPY "./ShoppingList.Identity.Ui" .
RUN cd ShoppingList.Identity.Ui && npm run build

FROM base AS final
WORKDIR /app
COPY --from=publish "/app/publish" .
COPY --from=angular "/src/ShoppingList.Identity.Ui/dist/shopping-list-identity-ui/browser" "./wwwroot"
ENTRYPOINT ["dotnet", "ShoppingList.Identity.dll"]