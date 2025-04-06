using Tonbite.Api.Model;

namespace Tonbite.Api.Extensions;

public static class QueryableExtensions
{
    public static IQueryable<T> ApplySorting<T>(this IQueryable<T> query, QuerySort sortBy) 
        => sortBy.Desc ? query.OrderDescending() : query;

    public static IQueryable<T> ApplyCourseFiltering<T>(this IQueryable<T> query, QueryFilter filter) where T : Course
    {
        query = query.Where(x => x.Visibility == Visibility.Public);
        
        if (!string.IsNullOrWhiteSpace(filter.SearchKey))
            query = query.Where(x => x.Name.Contains(filter.SearchKey) || x.Bio.Contains(filter.SearchKey));
        
        if (filter is { MinPrice: not null })
            query = query.Where(x => x.Price >= filter.MinPrice);
        
        if (filter is { MaxPrice: not null })
            query = query.Where(x => x.Price <= filter.MaxPrice);
        
        if (filter is { StartDate: not null })
            query = query.Where(x => x.Created >= filter.StartDate);
        
        if (filter is { EndDate: not null })
            query = query.Where(x => x.Created <= filter.EndDate);
        
        return query;
    }
}