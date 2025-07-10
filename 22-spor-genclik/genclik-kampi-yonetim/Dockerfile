FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["GenclikKampiYonetim.API/GenclikKampiYonetim.API.csproj", "GenclikKampiYonetim.API/"]
RUN dotnet restore "GenclikKampiYonetim.API/GenclikKampiYonetim.API.csproj"
COPY . .
WORKDIR "/src/GenclikKampiYonetim.API"
RUN dotnet build "GenclikKampiYonetim.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GenclikKampiYonetim.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GenclikKampiYonetim.API.dll"] 