using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Forms;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[Authorize]
[Route("/api/verify-email")]
public class VerifyEmailController(ApplicationDbContext context) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<User>> VerifyEmail([FromBody] VerifyEmailForm form)
    {
        var code = await context.VerificationCodes.FirstOrDefaultAsync(x => x.Email == form.Email && x.Code == form.Code);
        var user = await context.Users.FirstOrDefaultAsync(x => x.Email == form.Email);
        if (code is null || user is null || code.Expires < DateTime.UtcNow)
            return Ok("Wrong or expired code.");

        user.Verified = true;
        await context.UpdateAsync(user);
        await context.DeleteAsync(code);
        return user;
    }
}