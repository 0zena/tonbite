namespace Tonbite.Api.Http;

public interface IEmailHttpService
{
    Task SendProblemReport(string email, string message);
    
    Task SendVerificationCode(string email, string code);
}