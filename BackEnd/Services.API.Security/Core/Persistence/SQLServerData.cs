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
            //if (!userManager.Users.Any())
            //{
                var userDefault = new UserEntity
                {
                    // Optional properties

                    BirthDate = DateTime.Now,
                    City = "Huelva",
                    CP = "21002",


                    // user properties
                    Name = "Jose",
                    Surname = "Vélez",
                    RoleAdmin = true,

                    // identity properties
                    PhoneNumber = "798798789",
                    Email = "josec@gmail.com",
                    UserName = "JoseC",
                };
                await userManager.CreateAsync(userDefault, "Capela@360");
            }
        //}
    }
}
