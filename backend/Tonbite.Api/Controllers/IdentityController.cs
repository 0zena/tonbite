using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Identity;
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
    
    [HttpPost("/api/user/token")]
    public string GenerateToken(int userId, string email)
    {
        var tokenLifetime = TimeSpan.FromHours(8);
        
        var claims = new List<Claim>
        {
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new (JwtRegisteredClaimNames.NameId, userId.ToString()),
            new (JwtRegisteredClaimNames.Email, email)
        };
        
        var jwtSecret = Configuration["Jwt:Key"];
        if (string.IsNullOrEmpty(jwtSecret))
        {
            throw new InvalidOperationException("JWT secret key is not configured.");
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
        
        user.Password = passwordHasher.HashPassword(user, request.Password);

        Context.Add(user);
        Context.SaveChanges();

        return Ok("User registered successfully.");
    }
    
    [HttpPost("/api/user/login")]
    public IActionResult LoginUser([FromBody] UserLogin request)
    {
        if (!ModelState.IsValid)
            return BadRequest("User is not valid.");
        
        var user = Context.Users.FirstOrDefault(u => u.Email == request.Email);
        if (user == null)
            return Unauthorized("Invalid username or password.");
    
        var passwordHasher = new PasswordHasher<User>();
    
        var result = passwordHasher.VerifyHashedPassword(user, user.Password, request.Password);
        if (result == PasswordVerificationResult.Failed)
            return Unauthorized("Invalid username or password.");

        var jwt = GenerateToken(user.Id, user.Email);
    
        return Ok(new { jwt });
    }
}