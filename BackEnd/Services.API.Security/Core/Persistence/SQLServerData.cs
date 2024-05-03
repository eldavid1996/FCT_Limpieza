using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.API.Security.Core.Entities;

namespace Services.API.Security.Core.Persistence
{
    // Data Manager (for do DB tasks while app is starting)
    public class SQLServerData
    {
        public static async Task InsertUser(SQLServerContext context, UserManager<UserEntity> userManager)
        {
            context.Database.Migrate();
            if (!userManager.Users.Any())
            {
                var userDefault = new UserEntity
                {
                    // Optional properties

                    BirthDate = DateTime.Now,
                    City = "Admin",
                    CP = "21006",
                    urlImage = "Admin",

                    // user properties
                    Name = "Admin",
                    Surname = "Admin",
                    RoleAdmin = true,
                    DNI = "Admin",

                    // identity properties
                    PhoneNumber = "Admin",
                    Email = "Admin@gmail.com",
                    UserName = "Admin",
                };
                await userManager.CreateAsync(userDefault, "StrongPassword1!");
            }
        }
    }
}
