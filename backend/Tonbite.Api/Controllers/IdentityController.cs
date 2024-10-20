using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Tonbite.Api.Data;
using Tonbite.Api.Models;

namespace Tonbite.Api.Controllers;

[ApiController]
public class IdentityController : ControllerBase
{
    [Inject] private ApplicationDbContext Context { get; set; }
    [Inject] private IConfiguration Configuration { get; set; }
    
    public IdentityController(ApplicationDbContext context, IConfiguration configuration)
    {
        Context = context;
        Configuration = configuration;
    }
    
    [HttpPost("api/token")]
    public IActionResult GenerateToken()
    {
        TimeSpan tokenLifetime = TimeSpan.FromHours(8);
        
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new (JwtRegisteredClaimNames.Sub, "user-id"),
            new (JwtRegisteredClaimNames.Email, "email@gmail.com")
        };
        
        var jwtSecret = Configuration["Jwt:Key"];
        if (string.IsNullOrEmpty(jwtSecret))
        {
            return StatusCode(500, "JWT secret key is not configured.");
        }
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Create the JWT token
        var token = new JwtSecurityToken(
            issuer: "https:localhost",
            audience: "https:localhost",
            claims: claims,
            expires: DateTime.UtcNow.Add(tokenLifetime),
            signingCredentials: credentials
        );

        var tokenHandler = new JwtSecurityTokenHandler();
        var jwt = tokenHandler.WriteToken(token);

        // Return the token to the client
        return Ok(new { token = jwt });
    }

}