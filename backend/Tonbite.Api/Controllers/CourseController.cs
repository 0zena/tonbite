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
    public async Task<Course?> Get([FromRoute] long id) 
        => await context.Courses
            .Include(x => x.Owner)
            .Include(x => x.Steps)
            .FirstOrDefaultAsync(x => x.Id == id);

    [HttpPut]
    [Route("{id:long}")]
    [RequiresOneOfClaim(IdentityData.CreatorUserClaimName, "True", IdentityData.AdminUserClaimName, "True")]
    public async Task<ActionResult<Course>> Update([FromRoute] long id, [FromBody] Course form)
    {
        if (!ModelState.IsValid) return BadRequest();
        var user = context.Users.FirstOrDefault(x => x.Id == form.UserId);
        form.Owner = user;
        return Ok(await context.UpdateAsync(form));
    }

    [HttpDelete]
    [Route("{id:long}")]
    [RequiresOneOfClaim(IdentityData.CreatorUserClaimName, "True", IdentityData.AdminUserClaimName, "True")]
    public async Task<IActionResult> Delete([FromRoute] long id)
    {
        var course = context.Courses
            .FirstOrDefault(x => x.Id == id);
        
        if (course != null)
            await context.DeleteAsync(course);
        
        return Ok(course?.Id);
    }
}