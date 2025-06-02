using Microsoft.AspNetCore.Identity;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Model;

namespace Tonbite.Api.Identity;

public static class AdminBoot
{
    public static async Task UseDefaultAdmin(this WebApplication app, IConfigurationSection section)
    {
        using var scope = app.Services.CreateScope();
        var service = scope.ServiceProvider.GetRequiredService<IUserHttpService>();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var passwordHasher = new PasswordHasher<User>();

        if (await service.GetUserByEmail(section["Email"] ?? string.Empty) is null)
        {
            var admin = new User
            {
                Email = section["Email"]!,
            };
            
            admin.Password = passwordHasher.HashPassword(admin, section["Password"]!);

            var role = new Role
            {
                Name = nameof(Roles.Admin),
                Owner = admin
            };

            await db.CreateAsync(admin);
            await db.CreateAsync(role);
        }
    }
}