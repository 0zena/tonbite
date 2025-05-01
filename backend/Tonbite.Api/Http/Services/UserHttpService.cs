using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Tonbite.Api.Data;
using Tonbite.Api.Exceptions;
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
            throw new InvalidKeyException();
        
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
    public async Task<User?> GetUser(long id, bool roles = true)
    {
        var query = context.Users.AsQueryable();

        if (roles) query = query.Include(x => x.Roles);
        
        return await query.FirstOrDefaultAsync(x => x.Id == id);
    }
}