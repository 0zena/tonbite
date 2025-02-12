using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Models;

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
    public async Task<IActionResult> Get()
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

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] UserProps userProps)
    {
        if (!ModelState.IsValid) return BadRequest();
        
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userProps.Email);
        if (user == null) return NotFound();
        
        user.Bio = userProps.Bio;
        user.Username = userProps.Username;
        
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        
        return Ok("User updated.");
    }
}