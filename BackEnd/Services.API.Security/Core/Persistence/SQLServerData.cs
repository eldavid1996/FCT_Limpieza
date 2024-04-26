using Microsoft.AspNetCore.Identity;
using Services.API.Security.Core.Entities;

namespace Services.API.Security.Core.Persistence
{
    // Data Manager (for do DB tasks while app is starting)
    public class SQLServerData
    {
        public static async Task InsertUser(SQLServerContext context, UserManager<UserEntity> userManager)
        {
            if (!userManager.Users.Any())
            {
                var userDefault = new UserEntity
                {
                    // Optional properties

                    BirthDate = DateTime.Now,
                    City = "Huelva",
                    CP = "21006",


                    // user properties
                    Name = "David",
                    Surname = "Mendoza",
                    RoleAdmin = true,

                    // identity properties
                    PhoneNumber = "123456789",
                    Email = "david.mendoza@gmail.com",
                    UserName = "DavidMendoza",
                };
                await userManager.CreateAsync(userDefault, "StrongPassword1!");
            }
        }
    }
}
