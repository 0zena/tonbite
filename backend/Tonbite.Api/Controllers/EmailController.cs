using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Forms;
using Tonbite.Api.Http;

namespace Tonbite.Api.Controllers;

[ApiController]
[Route("/api/email")]
public class EmailController(IEmailHttpService service) : ControllerBase
{
    [HttpPost]
    [Route("report")]
    public Task ReportProblem([FromBody] ReportProblemForm form)
    {
        var message = string.Join('\n', form.Message, form.Author);
        return service.SendProblemReport("jevgenijs.kursevs@gmail.com", message);
    }
        
    [Authorize]
    [HttpPost("send-code")]
    public async Task<IActionResult> SendCode([FromBody] string email, [FromServices] IVerifyEmailService verifyEmailService)
    {
        var code = await verifyEmailService.GenerateVerificationCode(email);
        await service.SendVerificationCode(email, code.Code);
        
        return Ok($"email verification code sent to {email}.");
    }
}