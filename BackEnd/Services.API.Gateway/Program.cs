using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Services.API.Gateway;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Rule for Access, open for all
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsRule", rule =>
    {
        rule.WithOrigins("http://localhost:4200")
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials();
    });
});

// OCELOT
builder.Services.AddOcelot();
builder.Configuration.AddJsonFile("ocelot.json");

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

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseStaticFiles();
app.UseCors("CorsRule");
app.UseRouting();
app.UseHttpsRedirection();

// Middleware for centralize manage errors
app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseAuthorization(); // for jwt

app.MapControllers();

await app.UseOcelot(); // use Ocelot

app.Run();
