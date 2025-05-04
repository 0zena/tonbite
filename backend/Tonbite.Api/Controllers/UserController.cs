using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Identity;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[ApiController]
[Route("/api/user")]
public partial class UserController(ApplicationDbContext context, IUserHttpService service) : ControllerBase
{
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<User?>> Get([FromQuery] bool roles)
    {
        var id = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user =  await service.GetUser(id, roles);

        return user;
    }

    [Authorize]
    [HttpGet("search")]
    [RequiresClaim(IdentityData.AdminUserClaimName, "True")]
    public async Task<IList<User>?> Get([FromQuery] string key)
    {
        return await context.Users
            .Where(x => x.Email.ToLower().Contains(key.ToLower()) 
                        || x.Id.ToString() == key 
                        || x.Username!.ToLower().Contains(key.ToLower())
            )
            .OrderBy(x => x.Id)
            .ToListAsync();
    }

    [Authorize]
    [HttpGet("{id:long}/courses")]
    public async Task<List<Course>> GetUserCourses([FromRoute] long id, [FromQuery] UserCourseStatus status)
    {
        return await context.UserCourses
            .Where(x => x.User.Id == id && x.Status == status)
            .Include(x => x.Course)
            .Include(x => x.User)
            .Select(x => x.Course)  
            .ToListAsync();
    }
    
    [Authorize]
    [HttpPut]
    public async Task<ActionResult<User>> Update([FromBody] UserProps userProps)
    {
        if (!ModelState.IsValid) return BadRequest();
        
        var user = await service.GetUser(userProps.Id);
        if (user == null) return NotFound();
        user.CopyFrom(userProps);
        
        await context.UpdateAsync(user);
        return user;
    }

    [Authorize]
    [HttpGet("sold/count")]
    public async Task<int> GetSoldCoursesCount()
    {
        var id = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        return await context.Transactions.Where(x => x.RecipientId == id).CountAsync();
    }

    [HttpDelete("{id:long}")]
    public async Task Delete([FromRoute] long id)
    {
        var user = await service.GetUser(id);
        if (user == null) return;
        await context.DeleteAsync(user);
    }
}