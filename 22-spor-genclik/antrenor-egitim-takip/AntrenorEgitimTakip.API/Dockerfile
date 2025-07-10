FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["AntrenorEgitimTakip.API/AntrenorEgitimTakip.API.csproj", "AntrenorEgitimTakip.API/"]
RUN dotnet restore "AntrenorEgitimTakip.API/AntrenorEgitimTakip.API.csproj"
COPY . .
WORKDIR "/src/AntrenorEgitimTakip.API"
RUN dotnet build "AntrenorEgitimTakip.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AntrenorEgitimTakip.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AntrenorEgitimTakip.API.dll"] 