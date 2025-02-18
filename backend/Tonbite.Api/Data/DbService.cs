namespace Tonbite.Api.Data;

public static class DbService
{
    public static Task SaveAsync(this ApplicationDbContext dbContext, object entity)
    {
        dbContext.Add(entity);
        return dbContext.SaveChangesAsync();
    }
    
    public static Task UpdateAsync(this ApplicationDbContext dbContext, object entity)
    {
        dbContext.Update(entity);
        return dbContext.SaveChangesAsync();
    }
}