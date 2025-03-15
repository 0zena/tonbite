using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Data;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/transactions")]
public class TransactionController(ApplicationDbContext context) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TransactionProps request)
    {
        if (!ModelState.IsValid) return BadRequest();
        var sender = await context.Users.FindAsync(request.SenderId);
        var recipient = await context.Users.FindAsync(request.RecipientId);
        if (sender is null || recipient is null) return BadRequest();
        
        var transaction = new Transaction
        {
            Sender = sender,
            Recipient = recipient,
            SenderAddress = request.SenderAddress,
            RecipientAddress = request.RecipientAddress,
            Amount = request.Amount,
            Time = DateTime.UtcNow
        };

        var result = await context.CreateAsync(transaction);
        
        return Ok(result.Id);
    }
}