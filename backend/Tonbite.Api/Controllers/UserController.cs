using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[ApiController]
[Route("/api/user")]
public partial class UserController(ApplicationDbContext context, IUserHttpService service) : ControllerBase
{
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Get()
    {
        var email = HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.Email).Value;
        var user =  await service.GetUserProps(email);
        
        return user == null
            ? NotFound() 
            : Ok(user);
    }

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] UserProps userProps)
    {
        if (!ModelState.IsValid) return BadRequest();
        
        var user = await service.GetUser(userProps.Email);
        if (user == null) return NotFound();
        
        user.Bio = userProps.Bio;
        user.Username = userProps.Username;
        
        context.Users.Update(user);
        await context.SaveChangesAsync();
        
        return Ok("User updated.");
    }
}