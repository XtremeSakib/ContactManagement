using ContactManagement.Data;
using ContactManagement.Domain.Interface;
using ContactManagement.Domain.Repository;
using ContactManagement.Service;
using ContactManagement.UOW;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. CORS পলিসি সার্ভিস যোগ করা (Vercel ফ্রন্টএন্ডের জন্য)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVercelApp", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

// 2. PostgreSQL ডাটাবেজ কনটেক্সট রেজিস্টার করা
builder.Services.AddDbContext<ContactManagementDBContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("ContactManagementConnectionString")));

// 3. ডিপেনডেন্সি ইনজেকশন (Dependency Injection) রেজিস্টার করা
builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IUnitofWork, UnitofWork>();

var app = builder.Build();

// 4. CORS মিডলওয়্যার (অবশ্যই builder.Build() এর নিচে এবং UseAuthorization এর উপরে)
app.UseCors("AllowVercelApp");

// প্রোডাকশনেও যেন সোয়াগার বা এপিআই রেসপন্স ঠিকঠাক পাওয়া যায়, তাই শর্তটি কিছুটা শিথিল রাখা হলো
if (app.Environment.IsDevelopment() || true)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();