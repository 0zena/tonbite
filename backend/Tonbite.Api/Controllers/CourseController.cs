using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Identity;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[Authorize]
[ApiController]
[Route("/api/courses")]
public class CourseController(ApplicationDbContext context, ICourseHttpService service) : ControllerBase
{
    [HttpPost]
    [RequiresOneOfClaim(IdentityData.CreatorUserClaimName, "True", IdentityData.AdminUserClaimName, "True")]
    public async Task<IActionResult> Create(
        [FromBody] CourseProps props,
        [FromServices] IUserHttpService userService)
    {
        if (!ModelState.IsValid)
            return BadRequest();
        
        var id = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user = await userService.GetUser(id);
        if (user == null)
            return NotFound();

        var course = await context.CreateAsync(service.Create(props, user));
        
        return Ok(course);
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok();
    }
    
    [HttpGet]
    [Route("{id:long}")]
    public async Task<IActionResult> Get([FromRoute] long id)
    {
        var course = await context.Courses
            .Include(x => x.Owner)
            .Include(x => x.Steps)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        return course != null 
            ? Ok(course)
            : NotFound();
    }

    [HttpPut]
    [Route("{id:long}")]
    public async Task<IActionResult> Update([FromRoute] long id, [FromBody] Course course)
    {
        if (!ModelState.IsValid) return BadRequest();
        await context.UpdateAsync(course);
        return Ok(await context.UpdateAsync(course));
    }

    [HttpDelete]
    [Route("{id:long}")]
    public async Task<IActionResult> Delete([FromRoute] long id)
    {
        var course = context.Courses
            .FirstOrDefault(x => x.Id == id);
        
        if (course != null)
            await context.DeleteAsync(course);
        
        return Ok(course?.Id);
    }
}