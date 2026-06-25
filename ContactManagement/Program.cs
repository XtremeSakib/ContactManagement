using ContactManagement.Data;
using ContactManagement.Domain.Interface;
using ContactManagement.Domain.Repository;
using ContactManagement.Service;
using ContactManagement.UOW;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. এখানে আমরা শুধুমাত্র একটি শক্তিশালী CORS পলিসি রাখলাম (AllowAll)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ContactManagementDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ContactManagementConnectionString")));

builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IUnitofWork, UnitofWork>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 2. ঠিক এই পজিশনে (Routing/Redirection এর পর এবং Authorization এর আগে) CORS কল করতে হয়
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();