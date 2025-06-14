using Tonbite.Api.Model;

namespace Tonbite.Api.Http;

public interface IVerifyEmailService
{
    Task<VerificationCode> GenerateVerificationCode(string email);
}