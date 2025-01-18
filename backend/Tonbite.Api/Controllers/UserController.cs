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

    [HttpPost("register")]
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
    
    [HttpPost("login")]
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


        // Tokens
        var isAdmin = user.Roles!.Exists(r => r.Name == "Admin");
        var accessToken = service.GenerateAccessToken(user.Id, user.Email, isAdmin.ToString());
        var refreshToken = new RefreshToken
        {
            Token = service.GenerateRefreshToken(),
            Expires = DateTime.UtcNow.AddHours(12),
            User = user
        };
        
        // Save
        _context.Add(refreshToken);
        _context.SaveChanges();
        Response.Cookies.Append("refreshToken", refreshToken.Token, new CookieOptions
        {
            HttpOnly = true,
            Expires = refreshToken.Expires,
        });

        return Ok(new { accessToken });
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUser()
    {
        var email = HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.Email).Value;
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

    [HttpGet]
    [Route("token/refresh")]
    public IActionResult RefreshToken([FromServices] IUserHttpService service)
    {
        var refreshToken = HttpContext.Request.Cookies["refreshToken"];
        
        if (string.IsNullOrWhiteSpace(refreshToken)) 
            return Unauthorized();
        
        var storedToken = _context.RefreshTokens
            .Include(t => t.User)
            .ThenInclude(user => user.Roles)
            .FirstOrDefault(t => t.Token == refreshToken);
        
        if (storedToken == null || storedToken.Expires < DateTime.UtcNow)
            return Unauthorized();
        
        var isAdmin = storedToken.User.Roles!.Exists(r => r.Name == "Admin");
        var accessToken = service.GenerateAccessToken(storedToken.User.Id, storedToken.User.Email, isAdmin.ToString());
        return Ok(new { accessToken });
    }
}