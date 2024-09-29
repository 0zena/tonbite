using Microsoft.AspNetCore.Mvc;

namespace Decrypted.Api.Controllers;

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
}