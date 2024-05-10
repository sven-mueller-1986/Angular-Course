#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ShoppingList.Bff/ShoppingList.Bff.csproj", "ShoppingList.Bff/"]
RUN dotnet restore "./ShoppingList.Bff/ShoppingList.Bff.csproj"
COPY . .
WORKDIR "/src/ShoppingList.Bff"
RUN dotnet build "./ShoppingList.Bff.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ShoppingList.Bff.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM node:current-alpine3.19 as ng-build
WORKDIR /app
COPY ./../../ShoppingList/package.json .
RUN npm install
COPY ./../../ShoppingList .
RUN npm run build

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=ng-build /dist/shooping-list/browser /publish/wwwroot
ENTRYPOINT ["dotnet", "ShoppingList.Bff.dll"]