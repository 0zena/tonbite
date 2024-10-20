using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Tonbite.Api.Controllers;

public class MainController : ControllerBase
{
    public IActionResult Index()
    {
        return Ok("API Connected");
    }
    
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
}