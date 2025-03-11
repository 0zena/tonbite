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
    public string GenerateAccessToken(long userId, string email, bool isAdmin, bool isCreator)
    {
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new (JwtRegisteredClaimNames.NameId, userId.ToString()),
            new (JwtRegisteredClaimNames.Email, email),
            new (IdentityData.AdminUserClaimName, isAdmin.ToString()),
            new (IdentityData.CreatorUserClaimName, isCreator.ToString())
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
    public Task Create(UserRegister form)
    {
        var passwordHasher = new PasswordHasher<User>();
        
        var user = new User { Email = form.Email };

        var role = new Role
        {
            Name = "User",
            Owner = user
        };
        
        user.Roles ??= [];
        user.Password = passwordHasher.HashPassword(user, form.Password);

        context.Users.Add(user);
        context.Roles.Add(role);
        return context.SaveChangesAsync();
    }

    /// <inheritdoc /> 
    public Task<User?> GetUser(long id)
    {
        return context.Users
            .Where(u => u.Id == id)
            .Include(u => u.Roles)
            .FirstOrDefaultAsync();
    }

    /// <inheritdoc /> 
    public Task<UserProps?> GetUserProps(long id, bool courses, bool roles)
    {
        return context.Users
            .Include(x => x.Roles)!
            .ThenInclude(x => x.Owner)
            .Include(x => x.Courses)!
            .ThenInclude(x => x.Owner)
            .Select(x => new UserProps
            {
                Id = x.Id,
                Username = x.Username,
                Email = x.Email,
                Bio = x.Bio,
                Roles = roles ? x.Roles : null,
                Courses = courses ? x.Courses : null,
            })
            .FirstOrDefaultAsync(x => x.Id == id);
    }
}