using Tonbite.Api.Model;

namespace Tonbite.Api.Data;

public static class DbService
{
    public static async Task<object> CreateAsync(this ApplicationDbContext dbContext, object entity)
    {
        dbContext.Add(entity);
        await dbContext.SaveChangesAsync();
        return entity;
    }
    
    public static async Task<T> CreateAsync<T>(this ApplicationDbContext dbContext, T entity) where T : IEntity
    {
        dbContext.Add(entity);
        await dbContext.SaveChangesAsync();
        return entity;
    }
    
    public static async Task<T> UpdateAsync<T>(this ApplicationDbContext dbContext, T entity) where T : IEntity
    {
        dbContext.Update(entity);
        await dbContext.SaveChangesAsync();
        return entity;
    }

    public static Task DeleteAsync<T>(this ApplicationDbContext dbContext, T entity) where T : IEntity
    {
        dbContext.Remove(entity);
        return dbContext.SaveChangesAsync();
    }
}