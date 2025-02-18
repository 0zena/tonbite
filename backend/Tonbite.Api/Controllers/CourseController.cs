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
        if (!ModelState.IsValid)
            return BadRequest();
        
        var id = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user = await userService.GetUser(id);
        if (user == null)
            return NotFound("User not found.");
        
        await context.SaveAsync(service.Create(props, user));
        
        return Ok("Course saved.");
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok();
    }
    
    [HttpGet]
    [Route("{id:long}")]
    public IActionResult Get([FromRoute] long id)
    {
        return Ok();
    }

    [HttpPut]
    [Route("{id:long}")]
    public async Task<IActionResult> Update([FromRoute] long id, [FromBody] Course course)
    {
        if (!ModelState.IsValid) return BadRequest();
        await context.UpdateAsync(course);
        
        return Ok("course successfully updated.");
    }

    [HttpDelete]
    [Route("{id:long}")]
    public IActionResult Delete([FromRoute] long id)
    {
        return Ok();
    }
}