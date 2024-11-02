using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Tonbite.Api.Data;
using Tonbite.Api.Identity;
using Tonbite.Api.Models;

namespace Tonbite.Api.Controllers;

[ApiController]
public class IdentityController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    
    public IdentityController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }
    
    [HttpPost("/api/user/token")]
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

    [HttpPost("/api/user/register")]
    public IActionResult RegisterUser([FromBody] UserRegister request)
    {
        if (!ModelState.IsValid) 
            return BadRequest("User is not valid.");
        
        var passwordHasher = new PasswordHasher<User>();
        
        var user = new User
        {
            Username = request.Username,
            Email = request.Email,
            Bio = request.Bio,
        };

        var role = new Role
        {
            Name = "User",
            User = user
        };
        
        user.Password = passwordHasher.HashPassword(user, request.Password);

        _context.Add(user);
        _context.Add(role);
        _context.SaveChanges();

        return Ok("User registered successfully.");
    }
    
    [HttpPost("/api/user/login")]
    public IActionResult LoginUser([FromBody] UserLogin request)
    {
        if (!ModelState.IsValid)
            return BadRequest("User is not valid.");
        
        var user = _context.Users.Include(user => user.Roles).FirstOrDefault(u => u.Email == request.Email);
        if (user == null)
            return Unauthorized("Invalid username or password.");
    
        var passwordHasher = new PasswordHasher<User>();
    
        var result = passwordHasher.VerifyHashedPassword(user, user.Password, request.Password);
        if (result == PasswordVerificationResult.Failed)
            return Unauthorized("Invalid username or password.");

        var isAdmin = user.Roles!.Exists(r => r.Name == "Admin");

        var jwt = GenerateToken(user.Id, user.Email, isAdmin.ToString());
    
        return Ok(new { jwt });
    }
}