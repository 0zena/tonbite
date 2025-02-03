using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;

namespace Tonbite.Api.Controllers;

[ApiController]
[Route("/api/user")]
public partial class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    
    public UserController(ApplicationDbContext context)
    {
        _context = context;
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
        
        return user == null
            ? NotFound() 
            : Ok(user);
    }
}