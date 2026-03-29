using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Prato.Midoffice.Data;

var builder = WebApplication.CreateBuilder(args);

// Ensure Autofac is used
builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS Settings for Local Development (Vite Proxy compatibility)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVite",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;
    
    // Register Services
    containerBuilder.RegisterType<ValidationService>()
        .As<IValidationService>()
        .InstancePerLifetimeScope();

    // Register Repositories with connection string
    containerBuilder.Register(c => new EmployerRepository(connectionString))
        .As<IEmployerRepository>()
        .InstancePerLifetimeScope();

    containerBuilder.Register(c => new PersonRepository(connectionString))
        .As<IPersonRepository>()
        .InstancePerLifetimeScope();
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowVite");
app.UseAuthorization();
app.MapControllers();

app.Run();
