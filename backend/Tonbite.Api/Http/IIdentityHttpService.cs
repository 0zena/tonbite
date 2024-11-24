using Tonbite.Api.Models;

namespace Tonbite.Api.Http;

public interface IIdentityHttpService
{
    string GenerateToken(int userId, string email, string isAdmin);

    void Create(UserRegister form);
}