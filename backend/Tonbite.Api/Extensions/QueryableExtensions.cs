using Tonbite.Api.Model;

namespace Tonbite.Api.Extensions;

public static class QueryableExtensions
{
    public static IQueryable<T> ApplySorting<T>(this IQueryable<T> query, QuerySort sortBy) 
        => sortBy.Desc 
            ? query.OrderDescending() 
            : query;

    public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, int page, int pageSize)
        => query.Skip((page - 1) * pageSize).Take(pageSize);

    public static IQueryable<T> ApplyCourseSorting<T>(this IQueryable<T> query, QuerySort sortBy) where T : Course
        => sortBy.Desc 
            ? query.OrderByDescending(x => x.Created)
            : query.OrderBy(x => x.Created);
    
    public static IQueryable<T> ApplyCourseFiltering<T>(this IQueryable<T> query, QueryFilter filter) where T : Course
    {
        query = query.Where(x => x.Visibility == Visibility.Public);
        
        // BUG: EF Core does not allow to use string comparison
        if (!string.IsNullOrWhiteSpace(filter.SearchKey))
            query = query.Where(x => x.Name.ToLower().Contains(filter.SearchKey.ToLower())
                                     || x.Bio.ToLower().Contains(filter.SearchKey.ToLower()));
        
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