using Tonbite.Api.Model;

namespace Tonbite.Api.Http;

public interface ITransactionHttpService
{
    Transaction Create(TransactionProps props, User sender, User recipient);
}