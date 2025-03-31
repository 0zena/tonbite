using Tonbite.Api.Model;

namespace Tonbite.Api.Http.Services;

public class TransactionHttpService : ITransactionHttpService
{
    public Transaction Create(TransactionProps props, User sender, User recipient)
    {
        return new()
        {
            Sender = sender,
            RecipientId = recipient.Id,
            SenderAddress = props.SenderAddress,
            RecipientAddress = props.RecipientAddress,
            Amount = props.Amount,
            Time = DateTime.UtcNow
        };
    }
}