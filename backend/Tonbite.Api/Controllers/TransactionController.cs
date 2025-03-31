using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Data;
using Tonbite.Api.Http;
using Tonbite.Api.Model;

namespace Tonbite.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/transactions")]
public class TransactionController(ApplicationDbContext context, ITransactionHttpService service) : ControllerBase
{
    [HttpGet]
    [Route("{id:long}")]
    public Task<Transaction?> Get([FromRoute] long id) 
        => context.Transactions
            .Include(x => x.Sender)
            .SingleOrDefaultAsync(t => t.Id == id);

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TransactionProps request)
    {
        if (!ModelState.IsValid) return BadRequest();
        var sender = await context.Users.FindAsync(request.OwnerId);
        var recipient = await context.Users.FindAsync(request.RecipientId);
        if (sender is null || recipient is null) return BadRequest();
        var result = await context.CreateAsync(service.Create(request, sender, recipient));
        
        return Ok(result.Id);
    }
}