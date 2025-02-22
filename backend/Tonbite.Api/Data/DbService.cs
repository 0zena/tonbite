namespace Tonbite.Api.Data;

public static class DbService
{
    public static async Task<object> CreateAsync(this ApplicationDbContext dbContext, object entity)
    {
        dbContext.Add(entity);
        await dbContext.SaveChangesAsync();
        return entity;
    }
    
    public static async Task<object> UpdateAsync(this ApplicationDbContext dbContext, object entity)
    {
        dbContext.Update(entity);
        await dbContext.SaveChangesAsync();
        return entity;
    }

    public static Task DeleteAsync(this ApplicationDbContext dbContext, object entity)
    {
        dbContext.Remove(entity);
        return dbContext.SaveChangesAsync();
    }
}