using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Identity;

namespace Tonbite.Api.Controllers;

[ApiController]
[Route("/api/test")]
public class TestController : ControllerBase
{
    [AllowAnonymous]
    [HttpGet("/")]
    public IActionResult HealthCheck() => Ok("healthy");

    [AllowAnonymous]
    [HttpGet("anonymous")]
    public IActionResult TestRequest() => Ok("API TEST");

    [Authorize]
    [HttpGet("jwt")]
    public IActionResult TestSecureRequest() => Ok("JWT TEST");

    [Authorize(Policy = IdentityData.AdminUserPolicyName)]
    [HttpGet("admin-policy")]
    public IActionResult TestAdminPolicy() => Ok("ADMIN TEST");
    
    [Authorize]
    [HttpGet("admin-claim")]
    [RequiresClaim(IdentityData.AdminUserClaimName, "True")]
    public IActionResult TestClaimRequirements() => Ok("CLAIM TEST");
}