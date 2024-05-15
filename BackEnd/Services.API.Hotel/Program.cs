using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Services.API.Hotel.Core;
using Services.API.Hotel.Core.Entities;
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

// Create indexs for MongoDB
using (var context = app.Services.CreateScope())
{
    var services = context.ServiceProvider;
    try
    {
        var client = new MongoClient(builder.Configuration.GetSection("MongoDB:ConnectionString").Value);

        var cmdStr = "{ createIndexes: 'Room', indexes: [ { key: { RoomNumber: 1 }, name: 'RoomNumber-1', unique: true } ] }";
        var cmd = BsonDocument.Parse(cmdStr);
        var resultRoom = client.GetDatabase(builder.Configuration.GetSection("MongoDB:Database").Value).RunCommand<BsonDocument>(cmd);
        Console.WriteLine(resultRoom);

        cmdStr = "{ createIndexes: 'Task', indexes: [ { key: { 'Room.RoomNumber': 1 }, name: 'TaskRoomNumber-1', unique: true } ] }";
        cmd = BsonDocument.Parse(cmdStr);
        var resultTask = client.GetDatabase(builder.Configuration.GetSection("MongoDB:Database").Value).RunCommand<BsonDocument>(cmd);
        Console.WriteLine(resultTask);

    }
    catch (Exception e)
    {
        Console.WriteLine(e.Message);
    }
}
app.UseCors("CorsRule");
app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthorization();

// Middleware for centralize manage errors
app.UseMiddleware<ErrorHandlerMiddleware>();

app.MapControllers();

app.Run();
