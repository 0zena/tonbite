using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Tonbite.Api.Model;

public class Transaction : TransactionProps, IEntity
{
    /// <inheritdoc />
    [Key]
    public long Id { get; set; }
    
    /// <summary> User that sent transaction. </summary>
    [JsonIgnore]
    public User Sender { get; init; } = null!;
    
    /// <summary> Date and Time when transaction was made. </summary>
    public DateTime Time { get; init; }

    /// <inheritdoc />
    [NotMapped]
    public override long? OwnerId => Sender.Id;
}

/// <summary> Props that is used to create a new instance of <see cref="Transaction" />. </summary>
public class TransactionProps
{
    /// <summary> Transaction sender (<see cref="Transaction.Sender" />) address. </summary>
    public required string SenderAddress { get; set; }
    
    /// <summary> Transaction recipient (<see cref="User" />) address. </summary>
    public required string RecipientAddress { get; set; }
    
    /// <summary> ID of <see cref="Transaction.Sender" /> that send transaction. </summary>
    [NotMapped]
    public virtual long? OwnerId { get; set; }
    
    /// <summary> ID of <see cref="User" /> that must receive transaction. </summary>
    public long? RecipientId { get; set; }
    
    /// <summary> Sent amount of TON. </summary>
    public required string Amount { get; set; }
}
