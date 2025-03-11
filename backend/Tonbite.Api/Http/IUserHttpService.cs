using Tonbite.Api.Model;

namespace Tonbite.Api.Http;

public interface IUserHttpService
{
    /// <summary> Generates JsonWebToken which is used as access token. </summary>
    /// <param name="userId">Users unique identifier.</param>
    /// <param name="email">Users unique email.</param>
    /// <param name="isAdmin">Does user have admin role or not.</param>
    /// <param name="isCreator">Does user have creator role or not.</param>
    /// <returns>Access token as a string.</returns>
    string GenerateAccessToken(long userId, string email, bool isAdmin, bool isCreator);
    
    /// <summary> Generates refresh token. </summary>
    /// <returns>Regenerate token. Must be stored in database and sent as HTTP-only cookie.</returns>
    string GenerateRefreshToken();

    /// <summary> Creates and saves in database a new user. </summary>
    /// <param name="form">Data which is used to create a user.</param>
    Task Create(UserRegister form);
    
    /// <summary> Get specific user from database. </summary>
    /// <param name="id">Search key.</param>
    /// <returns>All users data from database.</returns>
    Task<User?> GetUser(long id);

    /// <summary> Get specific user fields from database. </summary>
    /// <param name="id"></param>
    /// <param name="courses">Include courses in response or not.</param>
    /// <param name="roles">Include roles in response or not</param>
    /// <returns>Only specific user fields.</returns>
    Task<UserProps?> GetUserProps(long id, bool courses, bool roles);
}