using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[Authorize]
[Route("/api/courses")]
public class CourseController(ApplicationDbContext context) : ControllerBase
{
    private readonly ApplicationDbContext _context = context;

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CourseProps props,
        [FromServices] IUserHttpService userService)
    {
        var email = HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.Email).Value;
        var user = await userService.GetUser(email);
        if (user == null) return NotFound("User not found.");
        
        var course = new Course
        {
            Name = props.Name,
            Bio = props.Bio,
            WalletAddress = props.WalletAddress,
            Price = props.Price,
            Created = DateTime.UtcNow,
            Owner = user
        };
        
        _context.Add(course);
        await _context.SaveChangesAsync();
        
        return Ok("Course saved.");
    }
    
    [HttpGet]
    [Route("{id:int}")]
    public IActionResult Get([FromRoute] int id)
    {
        return Ok();
    }

    [HttpPut]
    [Route("{id:int}")]
    public IActionResult Update([FromRoute] int id)
    {
        return Ok();
    }

    [HttpDelete]
    [Route("{id:int}")]
    public IActionResult Delete([FromRoute] int id)
    {
        return Ok();
    }
}