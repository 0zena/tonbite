namespace Tonbite.Api.Extensions;

public class QueryFilter
{
    public int Page { get; set; } = 1;
    
    public int DefaultPageSize { get; set; } = 15;
    
    public string? SearchKey { get; set; }

    public double? MinPrice { get; set; }

    public double? MaxPrice { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }
}