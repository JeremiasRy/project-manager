using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IUserData
    {
        Task DeleteUser(int userId);
        Task<User> GetUser(int id);
        Task<User> GetUser(string username);
        Task<IEnumerable<User>> GetUsers();
        Task InsertUser(SignInCredentials user);
    }
}