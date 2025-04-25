using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Extensions;
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
    public async Task<ActionResult<Course>> Create(
        [FromBody] CourseProps props,
        [FromServices] IUserHttpService userService)
    {
        if (!ModelState.IsValid)
            return BadRequest();
        
        var id = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user = await userService.GetUser(id);
        if (user == null)
            return NotFound();

        var course = service.Create(props, user);
        
        return await context.CreateAsync(course);
    }

    [HttpGet]
    public async Task<ActionResult<IList<Course>>> Get([FromQuery] QuerySort sort, [FromQuery] QueryFilter filter)
    {
        var total = await context.Courses
            .AsQueryable()
            .ApplyCourseFiltering(filter)
            .CountAsync();
        
        var courses = await context.Courses
            .AsQueryable()
            .ApplyCourseSorting(sort)
            .ApplyPaging(filter.Page, filter.DefaultPageSize)
            .ApplyCourseFiltering(filter)
            .ToListAsync();

        return Ok(new { total, courses }); 
    }
    
    [HttpGet]
    [Route("{id:long}")]
    public async Task<ActionResult<Course?>> Get(
        [FromRoute] long id, 
        [FromQuery] bool steps)
    {
        var userId = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var course = await service.Get(id, steps);

        if (course?.Visibility == Visibility.Private
            && course.Users?.FirstOrDefault(x =>
                x.UserId == userId &&
                x.Status == UserCourseStatus.Creator) == null)
            return Forbid();

        if (course?.Users?.FirstOrDefault(x => x.UserId == userId) != null) 
            return course;
        
        course!.Steps = [];
        return course;

    }

    [HttpPut]
    [Route("{id:long}")]
    [RequiresOneOfClaim(IdentityData.CreatorUserClaimName, "True", IdentityData.AdminUserClaimName, "True")]
    public async Task<ActionResult<Course>> Update(
        [FromRoute] long id, 
        [FromBody] CourseProps form,
        [FromServices] IUserHttpService userService)
    {
        var course = await service.Get(id, false);
        if (course == null) return NotFound();
        course.CopyFrom(form);
        
        return await context.UpdateAsync(course);
    }

    [HttpDelete]
    [Route("{id:long}")]
    [RequiresOneOfClaim(IdentityData.CreatorUserClaimName, "True", IdentityData.AdminUserClaimName, "True")]
    public async Task<IActionResult> Delete([FromRoute] long id)
    {
        var course = context.Courses.FirstOrDefault(x => x.Id == id);
        
        if (course != null)
            await context.DeleteAsync(course);
        
        return Ok(course?.Id);
    }

    [HttpPost]
    [Route("{id:long}/purchase")]
    public async Task<ActionResult<object>> Purchase([FromRoute] long id, [FromServices] IUserHttpService userService)
    {
        var userId = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user =  await userService.GetUser(userId, false);
        var course = await service.Get(id, false);
        if (user == null || course == null) return NotFound();

        var userCourse = new UserCourse
        {
            User = user,
            Course = course,
            Status = UserCourseStatus.Purchased,
            CreatedAt = DateTime.UtcNow
        };
        
        return await context.CreateAsync(userCourse);
    }

    [HttpPut]
    [Route("{id:long}/visibility/change")]
    [RequiresOneOfClaim(IdentityData.CreatorUserClaimName, "True", IdentityData.AdminUserClaimName, "True")]
    public async Task<ActionResult<Course>> ChangeVisibility([FromRoute] long id, [FromQuery] Visibility visibility)
    {
        Console.WriteLine((int)visibility);
        var course = await service.Get(id, false);
        if (course!.Visibility == visibility) return course;
        course.Visibility = visibility;
        
        return await context.UpdateAsync(course);
    }
}