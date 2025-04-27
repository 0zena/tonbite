namespace Tonbite.Api.Model.Utils;

public static class Users
{
    public static bool IsAdmin(this User? user) 
        => user?.Roles!.Exists(r => r.Name == nameof(Roles.Admin)) ?? false;
    
    public static bool IsCreator(this User? user) 
        => user?.Roles!.Exists(r => r.Name == nameof(Roles.Creator)) ?? false;
}