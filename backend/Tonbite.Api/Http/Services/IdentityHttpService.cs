using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Tonbite.Api.Identity;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Tonbite.Api.Http.Services;

public class IdentityHttpService : IIdentityHttpService
{
    private readonly IConfiguration _configuration;

    public IdentityHttpService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(int userId, string email, string isAdmin)
    {
        var tokenLifetime = TimeSpan.FromHours(8);
        
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
            issuer: _configuration["ClientBaseUrl"],
            audience: _configuration["ServerBaseUrl"],
            claims: claims,
            expires: DateTime.UtcNow.Add(tokenLifetime),
            signingCredentials: credentials
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }
}