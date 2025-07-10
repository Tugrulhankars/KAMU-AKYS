FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["AcikVeriPortali.API/AcikVeriPortali.API.csproj", "AcikVeriPortali.API/"]
RUN dotnet restore "AcikVeriPortali.API/AcikVeriPortali.API.csproj"
COPY . .
WORKDIR "/src/AcikVeriPortali.API"
RUN dotnet build "AcikVeriPortali.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AcikVeriPortali.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AcikVeriPortali.API.dll"] 