using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Identity;

namespace Tonbite.Api.Controllers;

public class TestController : ControllerBase
{
    [AllowAnonymous]
    [HttpGet("/api/test")]
    public IActionResult TestRequest()
    {
        return Ok("API TEST");
    }
    
    [Authorize]
    [HttpGet("/api/jwt/test")]
    public IActionResult TestSecureRequest()
    {
        return Ok("JWT TEST");
    }

    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpGet("/api/admin/test")]
    public IActionResult TestAdminPolicy()
    {
        return Ok("ADMIN TEST");
    }
    
    [Authorize]
    [HttpGet("/api/claim/test")]
    [RequiresClaim(IdentityData.AdminUserClaimName, "True")]
    public IActionResult TestClaimRequirements()
    {
        return Ok("CLAIM TEST");
    }
}