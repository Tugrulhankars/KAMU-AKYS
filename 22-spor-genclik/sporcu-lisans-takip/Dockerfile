FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["SporcuLisansTakip.API/SporcuLisansTakip.API.csproj", "SporcuLisansTakip.API/"]
RUN dotnet restore "SporcuLisansTakip.API/SporcuLisansTakip.API.csproj"
COPY . .
WORKDIR "/src/SporcuLisansTakip.API"
RUN dotnet build "SporcuLisansTakip.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SporcuLisansTakip.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SporcuLisansTakip.API.dll"] 