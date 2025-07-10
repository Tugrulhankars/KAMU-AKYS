FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["NufusSayimAPI.csproj", "."]
RUN dotnet restore "./NufusSayimAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "NufusSayimAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NufusSayimAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Add health check endpoint
RUN apt-get update && apt-get install -y curl

ENTRYPOINT ["dotnet", "NufusSayimAPI.dll"] 