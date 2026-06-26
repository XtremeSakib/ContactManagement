FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ContactManagement.csproj", "./"]
RUN dotnet restore "./ContactManagement.csproj"
COPY . .
RUN dotnet build "ContactManagement.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ContactManagement.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "ContactManagement.dll"]