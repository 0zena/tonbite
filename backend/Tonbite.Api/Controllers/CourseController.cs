using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[Authorize]
[Route("/api/courses")]
public class CourseController(ApplicationDbContext context, ICourseHttpService service) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CourseProps props,
        [FromServices] IUserHttpService userService)
    {
        var id = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user = await userService.GetUser(id);
        if (user == null) return NotFound("User not found.");
        
        context.Add(service.Create(props, user));
        await context.SaveChangesAsync();
        
        return Ok("Course saved.");
    }
    
    [HttpGet]
    [Route("{id:long}")]
    public IActionResult Get([FromRoute] long id)
    {
        return Ok();
    }

    [HttpPut]
    [Route("{id:long}")]
    public IActionResult Update([FromRoute] long id)
    {
        return Ok();
    }

    [HttpDelete]
    [Route("{id:long}")]
    public IActionResult Delete([FromRoute] long id)
    {
        return Ok();
    }
}