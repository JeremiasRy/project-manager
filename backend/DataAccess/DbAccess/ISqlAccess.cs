using DataAccess.Models;

namespace DataAccess.DbAccess
{
    public interface ISqlAccess
    {
        Task<IEnumerable<T>> LoadData<T, U>(string query, U parameters, string connectionString = "Default");
        Task<Project> LoadProject<T>(string query, T parameters, string connectionString = "Default");
        Task<ProjectTask> LoadTask<T>(string query, T parameters, string connectionString = "Default");
        Task<User> LoadUser<T>(string query, T parameters, string connectionString = "Default");
        Task SaveData<T>(string query, T parameters, string connectionString = "Default");
    }
}