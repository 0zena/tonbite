using SendGrid;
using SendGrid.Helpers.Mail;
using Tonbite.Api.Exceptions;

namespace Tonbite.Api.Http.Services;

public class EmailHttpService(ILogger<EmailHttpService> logger, IConfiguration configuration) : IEmailHttpService
{
    private readonly ILogger _logger = logger;

    public Task SendProblemReport(string email, string message)
        => SendEmailAsync(email, "Service Problem Report", message);

    private async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        var key = configuration["Sendgrid:Key"];
        if (string.IsNullOrEmpty(key))
            throw new InvalidKeyException();

        await Execute(key, subject, message, toEmail);
    }

    private async Task Execute(string apiKey, string subject, string message, string toEmail)
    {
        var email = configuration["SendGrid:SenderEmail"];
        var client = new SendGridClient(apiKey);
        var msg = new SendGridMessage
        {
            From = new EmailAddress(email, subject),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        
        msg.AddTo(new EmailAddress(toEmail));
        msg.SetClickTracking(false, false);
        
        var response = await client.SendEmailAsync(msg);
        
        _logger.LogInformation(response.IsSuccessStatusCode 
            ? $"Email to {toEmail} queued successfully!"
            : $"Failure Email to {toEmail}");
    }
}