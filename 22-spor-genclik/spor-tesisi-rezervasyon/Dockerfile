FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["SporTesisiRezervasyon.API/SporTesisiRezervasyon.API.csproj", "SporTesisiRezervasyon.API/"]
RUN dotnet restore "SporTesisiRezervasyon.API/SporTesisiRezervasyon.API.csproj"
COPY . .
WORKDIR "/src/SporTesisiRezervasyon.API"
RUN dotnet build "SporTesisiRezervasyon.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SporTesisiRezervasyon.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SporTesisiRezervasyon.API.dll"] 