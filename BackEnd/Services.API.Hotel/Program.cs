using Services.API.Hotel.Core;
using Services.API.Hotel.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// MongoDB Driver - Conexion
builder.Services.Configure<MongoSettings>(options =>
{
    options.ConnectionString = builder.Configuration.GetSection("MongoDB:ConnectionString").Value;
    options.Database = builder.Configuration.GetSection("MongoDB:Database").Value;
});

// Singleton for Inject ONLY 1 instance for Connect with DB --> MongoDBDriver
builder.Services.AddSingleton<MongoSettings>();

// Scoped for MORE than 1 instance for each API request and auto delete it when end --> Repository
builder.Services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));

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

app.UseHttpsRedirection();

// Middleware for centralize manage errors
app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors("CorsRule");

app.UseAuthorization();

app.MapControllers();

app.Run();
