using Tonbite.Api.Model;

namespace Tonbite.Api.Http;

public interface IUserHttpService
{
    /// <summary> Generates JsonWebToken which is used as access token. </summary>
    /// <param name="userId">Users unique identifier.</param>
    /// <param name="email">Users unique email.</param>
    /// <param name="isAdmin">Does user have admin role or not.</param>
    /// <returns>Access token as a string.</returns>
    string GenerateAccessToken(int userId, string email, string isAdmin);
    
    /// <summary> Generates refresh token. </summary>
    /// <returns>Regenerate token. Must be stored in database and sent as HTTP-only cookie.</returns>
    string GenerateRefreshToken();

    /// <summary> Creates and saves in database a new user. </summary>
    /// <param name="form">Data which is used to create a user.</param>
    void Create(UserRegister form);
    
    /// <summary> Get specific user from database. </summary>
    /// <param name="email">Search key.</param>
    /// <returns>All users data from database.</returns>
    Task<User?> GetUser(string email);
    
    /// <summary> Get specific user fields from database. </summary>
    /// <param name="email"></param>
    /// <returns>Only specific user fields.</returns>
    Task<UserProps?> GetUserProps(string email);
}