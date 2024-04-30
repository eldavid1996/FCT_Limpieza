using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Services.API.Security.Core;
using Services.API.Security.Core.Application;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// SQL Driver - Conexion
builder.Services.AddDbContext<SQLServerContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetSection("SQLServer:ConnectionString").Value);
});

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsRule", rule =>
    {
        rule.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

// Add methods to UserEntity for IdentityCore (SQL DB methods)
var identity = builder.Services.AddIdentityCore<UserEntity>();
// Entity Framework Core (for map the data grom IdentityCore)
var identityBuilder = new IdentityBuilder(identity.UserType, identity.Services);
// Core Identity - Entity Framework Core (join both services)
identityBuilder.AddEntityFrameworkStores<SQLServerContext>();
// Login Manager for UserEntity
identityBuilder.AddSignInManager<SignInManager<UserEntity>>();
// For set DateTime auto when creates a new User in the DB
builder.Services.TryAddSingleton(TimeProvider.System);

// Inject UserRegisterCommand class for controllers
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining(typeof(RegisterUpdate.UserRegisterCommand)));

// Inject IMapper
builder.Services.AddAutoMapper(typeof(RegisterUpdate.UserRegisterHandler));

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

// Create the default admin user if database is empty
using (var context = app.Services.CreateScope())
{
    var services = context.ServiceProvider;
    try
    {
        var userManager = services.GetRequiredService<UserManager<UserEntity>>();
        var contextEF = services.GetRequiredService<SQLServerContext>();

        SQLServerData.InsertUser(contextEF, userManager).Wait();
    }
    catch (Exception e)
    {
        var loggin = services.GetRequiredService<ILogger<Program>>();
        loggin.LogError(e, "Error al registrar usuario");
    }
}

app.UseHttpsRedirection();

// Middleware for centralize manage errors
app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseAuthorization();
app.UseCors("CorsRule");

app.MapControllers();

app.Run();
