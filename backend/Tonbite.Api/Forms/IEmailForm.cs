namespace Tonbite.Api.Forms;

public interface IEmailForm
{
    /// <summary> Message author. </summary>
    string Author { get; set; }
    
    /// <summary> Email main message. </summary>
    string Message { get; set; }
}