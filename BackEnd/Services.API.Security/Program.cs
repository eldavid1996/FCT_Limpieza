using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using Services.API.Security.Core;
using Services.API.Security.Core.Application;
using Services.API.Security.Core.Dto;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.JwtLogic;
using Services.API.Security.Core.Persistence;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// SQL Driver - Conexion
builder.Services.AddDbContext<SQLServerContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetSection("SQLServer:ConnectionString").Value);
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
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining(typeof(Register.UserRegisterCommand)));

// Inject IMapper
builder.Services.AddAutoMapper(typeof(Register.UserRegisterHandler));

// Inject JWT
builder.Services.AddScoped<IJwtGenerator, JwtGenerator>();

// Inject LoggedUser 
builder.Services.AddScoped<IUserLogged, UserLogged>();

// Authentication with JWT for API request
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("lSQOzerZ0NiZ5Ot8SQhlM1rCAUjRnl6cKibUHcgVrn+0DL8y0bUaFZeOOlHQ5zBeSn6tKObZFYfX52iLtuNcCQ=="));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = key,
        ValidateAudience = false, //all ip request
        ValidateIssuer = false, //all domain requests
    };
});

// reset password if is admin
builder.Services.AddSingleton<PasswordHasher<IdentityUser>>();


builder.Services.AddControllers();

// Rule for Access, open for all
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsRule", rule =>
    {
        rule.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseStaticFiles();

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

app.UseCors("CorsRule");

app.UseAuthorization();

app.MapControllers();

app.Run();
