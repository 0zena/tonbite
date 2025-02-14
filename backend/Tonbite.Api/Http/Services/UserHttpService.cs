using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Tonbite.Api.Data;
using Tonbite.Api.Identity;
using Tonbite.Api.Model;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Tonbite.Api.Http.Services;

public class UserHttpService(IConfiguration configuration, ApplicationDbContext context) : IUserHttpService
{
    /// <inheritdoc /> 
    public string GenerateAccessToken(int userId, string email, string isAdmin)
    {
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new (JwtRegisteredClaimNames.NameId, userId.ToString()),
            new (JwtRegisteredClaimNames.Email, email),
            new (IdentityData.AdminUserClaimName, isAdmin)
        };
        
        var jwtSecret = configuration["Jwt:Key"];
        if (string.IsNullOrEmpty(jwtSecret))
        {
            throw new InvalidOperationException("JWT secret key is not configured.");
        }
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        
        var token = new JwtSecurityToken(
            issuer: configuration["ServerBaseUrl"],
            audience: configuration["ClientBaseUrl"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: credentials
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    /// <inheritdoc /> 
    public string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    /// <inheritdoc /> 
    public void Create(UserRegister form)
    {
        var passwordHasher = new PasswordHasher<User>();
        
        var user = new User { Email = form.Email };

        var role = new Role
        {
            Name = "User",
            User = user
        };
        
        user.Password = passwordHasher.HashPassword(user, form.Password);

        context.Add(user);
        context.Add(role);
        context.SaveChanges();
    }

    /// <inheritdoc /> 
    public Task<User?> GetUser(string email)
    {
        return context.Users
            .Where(u => u.Email == email)
            .Include(u => u.Roles)
            .Include(u => u.Courses)
            .FirstOrDefaultAsync();
    }

    /// <inheritdoc /> 
    public Task<UserProps?> GetUserProps(string email)
    {
        return context.Users
            .Where(x => x.Email == email)
            .Select(x => new UserProps
            {
                Id = x.Id,
                Username = x.Username,
                Email = x.Email,
                Bio = x.Bio
            })
            .FirstOrDefaultAsync();
    }
}