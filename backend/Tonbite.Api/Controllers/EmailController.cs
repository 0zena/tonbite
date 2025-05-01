using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Forms;
using Tonbite.Api.Http;
using Tonbite.Api.Http.Services;

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
}