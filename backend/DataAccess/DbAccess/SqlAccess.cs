using Dapper;
using DataAccess.Models;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace DataAccess.DbAccess;

public class SqlAccess : ISqlAccess
{
    private readonly IConfiguration _config;
    public async Task<Project> LoadProject<T>(string query, T parameters, string connectionString = "Default")
    {
        string? connectionS = _config.GetConnectionString(connectionString);
        if (connectionS is not null)
        {
            using var connection = NpgsqlDataSource.Create(connectionS).CreateConnection();
            {
                using var multi = await connection.QueryMultipleAsync(query, parameters);
                {
                    var project = multi.Read<Project>().Single();
                    project.Tasks = multi.Read<ProjectTask>().ToList();
                    project.UsersAssigned = multi.Read<User>().ToList();
                    return project;
                }
            }
        }
        else
        {
            throw new Exception("Connection string returned null");
        }
    }
    public async Task<ProjectTask> LoadTask<T>(string query, T parameters, string connectionString = "Default")
    {
        string? connectionS = _config.GetConnectionString(connectionString);
        if (connectionS is not null)
        {
            using var connection = NpgsqlDataSource.Create(connectionS).CreateConnection();
            {
                using var multi = await connection.QueryMultipleAsync(query, parameters);
                {
                    var task = multi.Read<ProjectTask>().Single();
                    task.Project = multi.Read<Project>().Single();
                    try
                    {
                        task.UserAssigned = multi.Read<User>().Single();
                    } catch
                    {
                        task.UserAssigned = null;
                    }
                    return task;
                }
            }
        }
        else
        {
            throw new Exception("Connection string returned null");
        }
    }
    public async Task<User> LoadUser<T>(string query, T parameters, string connectionString = "Default")
    {
        string? connectionS = _config.GetConnectionString(connectionString);

        if (connectionS is not null)
        {
            using var connection = NpgsqlDataSource.Create(connectionS).CreateConnection();
            {
                using var multi = await connection.QueryMultipleAsync(query, parameters);
                {
                    var user = multi.Read<User>().Single();
                    user.Tasks = multi.Read<ProjectTask>().ToList();
                    user.Projects = multi.Read<Project>().ToList();
                    return user;
                }
            }
        }
        else
        {
            throw new Exception("Connection string returned null");
        }
    }
    public async Task<IEnumerable<T>> LoadData<T, U>(string query, U parameters, string connectionString = "Default")
    {
        string? connectionS = _config.GetConnectionString(connectionString);
        if (connectionS is not null)
        {
            using var connection = NpgsqlDataSource.Create(connectionS).CreateConnection();
            {
                return await connection.QueryAsync<T>(query, parameters);
            }
        }
        else
        {
            throw new Exception("Connection string returned null");
        }

    }
    public async Task SaveData<T>(string query, T parameters, string connectionString = "Default")
    {
        string? connectionS = _config?.GetConnectionString(connectionString);
        if (connectionS is not null)
        {
            using var connection = NpgsqlDataSource.Create(connectionS).CreateConnection();
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }
        else
        {
            throw new Exception("Connection string returned null");
        }

    }
    public SqlAccess(IConfiguration config)
    {
        _config = config;
    }
}
