using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Models;

namespace Tonbite.Api.Controllers;

[ApiController]
public class IdentityController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    
    public IdentityController(ApplicationDbContext context)
    {
        _context = context;
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
    public IActionResult LoginUser([FromBody] UserLogin request, [FromServices] IIdentityHttpService service)
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

        var jwt = service.GenerateToken(user.Id, user.Email, isAdmin.ToString());
    
        return Ok(new { jwt });
    }
}