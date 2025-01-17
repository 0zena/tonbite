using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Models;

namespace Tonbite.Api.Controllers;

[ApiController]
[Route("/api/user")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    
    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("/register")]
    public IActionResult RegisterUser(
        [FromBody] UserRegister request, 
        [FromServices] IUserHttpService service)
    {
        if (!ModelState.IsValid) 
            return BadRequest("User is not valid.");
        
        var exists = _context.Users.FirstOrDefault(u => u.Email == request.Email);
        if (exists != null)
            return Conflict("User with this email already exists.");

        try 
        {
            service.Create(request);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

        return Ok("User registered successfully.");
    }
    
    [HttpPost("/login")]
    public IActionResult LoginUser(
        [FromBody] UserLogin request, 
        [FromServices] IUserHttpService service)
    {
        if (!ModelState.IsValid)
            return BadRequest("User is not valid.");
        
        var user = _context.Users
            .Include(user => user.Roles)
            .FirstOrDefault(u => u.Email == request.Email);
        
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

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUser()
    {
        var email = HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.Email).Value;
        Console.WriteLine(email);
        var user =  await _context.Users
            .Where(u => u.Email == email)
            .Select(u => new
            {
                u.Id,
                u.Email,
                u.Username,
                u.Bio
            })
            .FirstOrDefaultAsync();
        
        return Ok(user);
    }
}