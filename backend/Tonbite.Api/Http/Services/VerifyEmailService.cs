using Tonbite.Api.Data;
using Tonbite.Api.Model;

namespace Tonbite.Api.Http.Services;

public class VerifyEmailService(ApplicationDbContext context) : IVerifyEmailService
{
    public async Task<VerificationCode> GenerateVerificationCode(string email)
    {
        var random = new Random();
        var code = new VerificationCode
        {
            Code = random.Next(10000, 99999).ToString(),
            Email = email,
            Created = DateTime.UtcNow,
            Expires = DateTime.UtcNow.AddHours(1)
        };

        return await context.CreateAsync(code);
    }
}