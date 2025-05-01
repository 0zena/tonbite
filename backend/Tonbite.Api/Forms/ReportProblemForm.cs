namespace Tonbite.Api.Forms;

/// <summary>
/// Form to send feedback.
/// </summary>
public class ReportProblemForm : IEmailForm
{
    /// <inheritdoc />
    public string Author { get; set; } = string.Empty;
    
    /// <inheritdoc />
    public string Message { get; set; } = string.Empty;
}