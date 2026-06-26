using ContactManagement.Data;
using ContactManagement.Domain.Interface;
using ContactManagement.Domain.Repository;
using ContactManagement.Service;
using ContactManagement.UOW;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

 
builder.Services.AddDbContext<ContactManagementDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ContactManagementConnectionString")));

 
builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IUnitofWork, UnitofWork>();

var app = builder.Build();

 
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment() || true)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();