using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[ApiController]
[Route("/api/user")]
public partial class UserController(ApplicationDbContext context, IUserHttpService service) : ControllerBase
{
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Get(
        [FromQuery] bool courses, 
        [FromQuery] bool roles)
    {
        var id = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user =  await service.GetUserProps(id, courses, roles);
        
        return user == null
            ? NotFound() 
            : Ok(user);
    }

    [Authorize]
    [HttpGet("{id:long}/courses")]
    public IActionResult GetCourses([FromRoute] long id)
    {
        var courses = context.Courses
            .Where(x => x.Owner.Id == id)
            .Include(x => x.Owner)
            .Include(x => x.Steps);
        
        return Ok(courses);
    }
    
    [Authorize]
    [HttpPatch]
    public async Task<IActionResult> Update([FromBody] UserProps userProps)
    {
        if (!ModelState.IsValid) return BadRequest();
        
        var user = await service.GetUser(userProps.Id);
        if (user == null) return NotFound();
        
        user.Bio = userProps.Bio;
        user.Username = userProps.Username;
        
        await context.UpdateAsync(user);
        return Ok("User updated.");
    }
}