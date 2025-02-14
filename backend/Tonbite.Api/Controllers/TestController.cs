using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Identity;

namespace Tonbite.Api.Controllers;

[Route("/api/test")]
public class TestController : ControllerBase
{
    [AllowAnonymous]
    [HttpGet("anonymous")]
    public IActionResult TestRequest()
    {
        return Ok("API TEST");
    }
    
    [Authorize]
    [HttpGet("jwt")]
    public IActionResult TestSecureRequest()
    {
        return Ok("JWT TEST");
    }

    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpGet("admin-policy")]
    public IActionResult TestAdminPolicy()
    {
        return Ok("ADMIN TEST");
    }
    
    [Authorize]
    [HttpGet("admin-claim")]
    [RequiresClaim(IdentityData.AdminUserClaimName, "True")]
    public IActionResult TestClaimRequirements()
    {
        return Ok("CLAIM TEST");
    }
}