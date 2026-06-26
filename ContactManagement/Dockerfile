# ১. SDK ইমেজ দিয়ে অ্যাপটি বিল্ড করা
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# পুরো প্রজেক্টের কোড ডকার কন্টেইনারে কপি করা
COPY . .

# ডিপেনডেন্সি রিস্টোর এবং পাবলিশ করা
RUN dotnet restore
RUN dotnet publish -c Release -o /app

# ২. রানটাইম ইমেজ দিয়ে অ্যাপটি রান করা
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .

# Render-এর পোর্টের জন্য কনফিগারেশন
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# তোমার মেইন এপিআই প্রজেক্টের DLL রান করা
ENTRYPOINT ["dotnet", "ContactManagement.dll"]