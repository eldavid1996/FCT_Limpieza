using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.Text;

namespace Services.API.Gateway
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
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

            // OCELOT
            services.AddOcelot();

            // Authentication with JWT for API request
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("lSQOzerZ0NiZ5Ot8SQhlM1rCAUjRnl6cKibUHcgVrn+0DL8y0bUaFZeOOlHQ5zBeSn6tKObZFYfX52iLtuNcCQ=="));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateAudience = false, //all ip request
                    ValidateIssuer = false, //all domain requests
                };
            });

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseStaticFiles();
            app.UseCors("CorsRule");
            app.UseRouting();
            //app.UseHttpsRedirection();

            //app.UseAuthentication(); // for jwt
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseOcelot().Wait(); // use Ocelot

            // Middleware for centralize manage errors
            app.UseMiddleware<ErrorHandlerMiddleware>();
        }
    }
}
