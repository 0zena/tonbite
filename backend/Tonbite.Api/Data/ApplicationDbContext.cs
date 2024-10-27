using Microsoft.EntityFrameworkCore;
using Tonbite.Api.Models;

namespace Tonbite.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    
    public DbSet<User> Users { get; set; }
}