namespace Tonbite.Api.Extensions;

public class QueryPaging
{
    public int Page { get; set; } = 1;
    
    public int DefaultPageSize { get; set; } = 16;
}