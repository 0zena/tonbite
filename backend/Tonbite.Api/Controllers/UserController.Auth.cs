using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

public partial class UserController
{
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] UserRegister request)
    {
        if (!ModelState.IsValid) 
            return BadRequest("User is not valid.");
        
        var exists = context.Users.FirstOrDefault(u => u.Email == request.Email);
        if (exists != null)
            return Conflict("User with this email already exists.");

        try 
        {
            await service.Create(request);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

        return Ok("User registered successfully.");
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> LoginUser([FromBody] UserLogin request)
    {
        if (!ModelState.IsValid)
            return BadRequest("User is not valid.");
        
        var user = await context.Users
            .Include(user => user.Roles!)
            .FirstOrDefaultAsync(u => u.Email == request.Email);
        
        if (user == null)
            return Unauthorized("Invalid username or password.");
    
        var passwordHasher = new PasswordHasher<User>();
        var result = passwordHasher.VerifyHashedPassword(user, user.Password, request.Password);
        if (result == PasswordVerificationResult.Failed)
            return Unauthorized("Invalid username or password.");

        // Tokens
        var isAdmin = user.Roles!.Exists(r => r.Name == nameof(Roles.Admin));
        var isCreator = user.Roles!.Exists(r => r.Name == nameof(Roles.Creator));
        var accessToken = service.GenerateAccessToken(user.Id, user.Email, isAdmin, isCreator);
        var refreshToken = new RefreshToken
        {
            Token = service.GenerateRefreshToken(),
            Expires = DateTime.UtcNow.AddHours(12),
            Owner = user
        };
        
        // Save
        context.Add(refreshToken);
        await context.SaveChangesAsync();
        Response.Cookies.Append("refreshToken", refreshToken.Token, new CookieOptions
        {
            Secure = true, 
            HttpOnly = true,
            SameSite = SameSiteMode.None,
            Expires = refreshToken.Expires,
        });

        return Ok(new { accessToken });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        var refreshToken = Request.Cookies["refreshToken"] ?? string.Empty;
        var storedToken = context.RefreshTokens.FirstOrDefault(t => t.Token == refreshToken);
        
        if (storedToken == null) 
            return Ok("User already logged out.");
        
        context.RefreshTokens.Remove(storedToken);
        context.SaveChanges();

        Response.Cookies.Delete("refreshToken", new CookieOptions
        {
            Secure = true,            
            SameSite = SameSiteMode.None
        });
        
        return Ok("User logged out successfully.");
    }

    [HttpPost("token/refresh")]
    public IActionResult RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];

        if (string.IsNullOrWhiteSpace(refreshToken))
            return Unauthorized("Refresh token is not provided.");
        
        var storedToken = context.RefreshTokens
            .Include(t => t.Owner)
            .ThenInclude(user => user.Roles)
            .FirstOrDefault(t => t.Token == refreshToken);

        if (storedToken == null) 
            return Unauthorized("Invalid refresh token.");
        
        if (storedToken.Expires < DateTime.UtcNow)
        {
            context.DeleteAsync(storedToken);
            Response.Cookies.Delete("refreshToken", new CookieOptions
            {
                Secure = true,
                SameSite = SameSiteMode.None
            });
            return Unauthorized("User session has expired.");
        }
        
        var isAdmin = storedToken.Owner.Roles!.Exists(r => r.Name == nameof(Roles.Admin));
        var isCreator = storedToken.Owner.Roles!.Exists(r => r.Name == nameof(Roles.Creator));
        var accessToken = service.GenerateAccessToken(storedToken.Owner.Id, storedToken.Owner.Email, isAdmin, isCreator);
        return Ok(new { accessToken });
    }

    [Authorize]
    [HttpPut("password/change")]
    public async Task<IActionResult> ChangePassword([FromBody] PasswordReset form)
    {
        if (!ModelState.IsValid)
            return BadRequest("User is not valid.");
        
        var id = long.Parse(HttpContext.User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);
        var user =  await service.GetUser(id);
        
        if (user is null)
            return NotFound("User not found.");
        
        var passwordHasher = new PasswordHasher<User>();
        var result = passwordHasher.VerifyHashedPassword(user, user.Password, form.Password);
        if (result == PasswordVerificationResult.Failed)
            return Unauthorized("Invalid password.");

        user.Password = passwordHasher.HashPassword(user, form.NewPassword);
        context.Update(user);
        await context.SaveChangesAsync();
        
        return Ok("Password changed successfully.");
    }
    
    [Authorize]
    [HttpPost("{id:long}/role/creator")]
    public async Task<ActionResult<User>> BecomeCreator([FromRoute] long id)
    {
        var user = context.Users
            .Include(x => x.Roles)
            .FirstOrDefault(x => x.Id == id);

        user!.Roles ??= [];
        if (!user.Roles.Exists(x => x.Name == nameof(Roles.Creator)))
            user.Roles?.Add(new() { Name = nameof(Roles.Creator), Owner = user });

        return await context.UpdateAsync(user);
    }
}