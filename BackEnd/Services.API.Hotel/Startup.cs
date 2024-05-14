using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Services.API.Hotel.Core;
using Services.API.Hotel.Repository;

namespace Services.API.Hotel
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var sqlServerConnectionString = Environment.GetEnvironmentVariable("APP_CONNECTION_STRING");
            var sqlServerConnectionDatabase = Environment.GetEnvironmentVariable("APP_DATABASE");
            Console.WriteLine("antes de comprobar: " + sqlServerConnectionString);
            Console.WriteLine("antes de comprobar: " + sqlServerConnectionString);

            if (string.IsNullOrEmpty(sqlServerConnectionString))
            {
                Console.WriteLine("default"+sqlServerConnectionString);
                sqlServerConnectionString = Configuration.GetSection("MongoDB:ConnectionString").Value;
            }
            if (string.IsNullOrEmpty(sqlServerConnectionDatabase))
            {
                Console.WriteLine("default"+sqlServerConnectionDatabase);
                sqlServerConnectionDatabase = Configuration.GetSection("MongoDB:Database").Value;
            }

            // MongoDB Driver - Conexion
            services.Configure<MongoSettings>(options =>
            {
                options.ConnectionString = sqlServerConnectionString;
                options.Database = sqlServerConnectionDatabase;
            });

            Console.WriteLine("despues de comprobar: " + sqlServerConnectionString);
            Console.WriteLine("despues de comprobar: " + sqlServerConnectionString);

            // SQL Driver - Conexion
            services.AddSignalR();

            // Singleton for Inject ONLY 1 instance for Connect with DB --> MongoDBDriver
            services.AddSingleton<MongoSettings>();

            // For notifications
            services.AddSingleton<NotificationHub>();

            // Scoped for MORE than 1 instance for each API request and auto delete it when end --> Repository
            services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));

            services.AddControllers();

            // Rule for Access, open for all
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsRule", rule =>
                {
                    rule.WithOrigins("http://localhost:4200")
                                   .AllowAnyHeader()
                                   .AllowAnyMethod()
                                   .AllowCredentials();
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            // Middleware for centralize manage errors
            app.UseMiddleware<ErrorHandlerMiddleware>();

            app.UseCors("CorsRule");
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                _ = endpoints.MapHub<NotificationHub>("/notificationHub/notificationHub");

                endpoints.MapControllers();
            });

            CreateIndexs(app).GetAwaiter().GetResult();

        }
        private async Task CreateIndexs(IApplicationBuilder app)
        {
            // Create indexs for MongoDB
            using (var context = app.ApplicationServices.CreateScope())
            {
                var services = context.ServiceProvider;
                try
                {
                    var client = new MongoClient(Configuration.GetSection("MongoDB:ConnectionString").Value);

                    var cmdStr = "{ createIndexes: 'Room', indexes: [ { key: { RoomNumber: 1 }, name: 'RoomNumber-1', unique: true } ] }";
                    var cmd = BsonDocument.Parse(cmdStr);
                    var resultRoom = client.GetDatabase(Configuration.GetSection("MongoDB:Database").Value).RunCommand<BsonDocument>(cmd);
                    Console.WriteLine(resultRoom);

                    cmdStr = "{ createIndexes: 'Task', indexes: [ { key: { 'Room.RoomNumber': 1 }, name: 'TaskRoomNumber-1', unique: true } ] }";
                    cmd = BsonDocument.Parse(cmdStr);
                    var resultTask = client.GetDatabase(Configuration.GetSection("MongoDB:Database").Value).RunCommand<BsonDocument>(cmd);
                    Console.WriteLine(resultTask);

                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
        }
    }
}