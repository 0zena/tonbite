using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tonbite.Api.Model;

public class Transaction : TransactionProps, IEntity
{
    /// <inheritdoc />
    [Key]
    public long Id { get; set; }
    
    [JsonIgnore]
    public required User Sender { get; init; }
    
    [JsonIgnore]
    [NotMapped]
    public required User Recipient { get; init; }

    public DateTime Time { get; init; }

    /// <inheritdoc />
    [NotMapped]
    public override long? SenderId => Sender?.Id;

    /// <inheritdoc />
    public override long? RecipientId => Recipient?.Id;
}

public class TransactionProps
{
    public string SenderAddress { get; set; }
    public string RecipientAddress { get; set; }
    
    [NotMapped]
    public virtual long? SenderId { get; set; }
    
    public virtual long? RecipientId { get; set; }
    public string Amount { get; set; }
    
}
