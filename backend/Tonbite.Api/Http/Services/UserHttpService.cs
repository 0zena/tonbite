using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Tonbite.Api.Data;
using Tonbite.Api.Identity;
using Tonbite.Api.Models;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Tonbite.Api.Http.Services;

public class UserHttpService : IUserHttpService
{
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;

    public UserHttpService(IConfiguration configuration, ApplicationDbContext context)
    {
        _configuration = configuration;
        _context = context;
    }

    public string GenerateAccessToken(int userId, string email, string isAdmin)
    {
       
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new (JwtRegisteredClaimNames.NameId, userId.ToString()),
            new (JwtRegisteredClaimNames.Email, email),
            new (IdentityData.AdminUserClaimName, isAdmin)
        };
        
        var jwtSecret = _configuration["Jwt:Key"];
        if (string.IsNullOrEmpty(jwtSecret))
        {
            throw new InvalidOperationException("JWT secret key is not configured.");
        }
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        
        var token = new JwtSecurityToken(
            issuer: _configuration["ServerBaseUrl"],
            audience: _configuration["ClientBaseUrl"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: credentials
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

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

        _context.Add(user);
        _context.Add(role);
        _context.SaveChanges();
    }
}