FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["DemirbasAPI.WebAPI/DemirbasAPI.WebAPI.csproj", "DemirbasAPI.WebAPI/"]
COPY ["DemirbasAPI.Application/DemirbasAPI.Application.csproj", "DemirbasAPI.Application/"]
COPY ["DemirbasAPI.Domain/DemirbasAPI.Domain.csproj", "DemirbasAPI.Domain/"]
COPY ["DemirbasAPI.Infrastructure/DemirbasAPI.Infrastructure.csproj", "DemirbasAPI.Infrastructure/"]

RUN dotnet restore "DemirbasAPI.WebAPI/DemirbasAPI.WebAPI.csproj"
COPY . .
WORKDIR "/src/DemirbasAPI.WebAPI"
RUN dotnet build "DemirbasAPI.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DemirbasAPI.WebAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DemirbasAPI.WebAPI.dll"] 