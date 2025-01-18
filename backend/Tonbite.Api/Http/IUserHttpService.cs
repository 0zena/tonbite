using Tonbite.Api.Models;

namespace Tonbite.Api.Http;

public interface IUserHttpService
{
    string GenerateAccessToken(int userId, string email, string isAdmin);
    
    string GenerateRefreshToken();

    void Create(UserRegister form);
}