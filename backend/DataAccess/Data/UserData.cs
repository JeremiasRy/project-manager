using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data;

public class UserData : IUserData
{
    private readonly ISqlAccess _sqlAccess;
    public async Task<IEnumerable<User>> GetUsers()
    {
        var users = await _sqlAccess.LoadData<User, dynamic>("SELECT userId FROM \"user\"", new { });
        List<User> result = new();
        foreach (var user in users)
        {
            result.Add(await GetUser((int)user.UserId));
        }
        return result;
    }
    public async Task<User> GetUser(string username)
    {
        var user = await _sqlAccess.LoadData<User, dynamic>("SELECT * FROM \"user\" WHERE username = @Username", new { Username = username });
        int? userId = user.First().UserId;
        if (userId == null)
        {
            throw new Exception("Can't find user");
        }
        return await _sqlAccess.LoadUser<dynamic>("SELECT * FROM \"user\" WHERE userId = @userId; SELECT * FROM user_task_map t1 JOIN task t2 ON t2.taskId = t1.taskId WHERE t1.userId = @userId; SELECT * FROM project_user_map t1 JOIN project t2 ON t2.projectId = t1.projectId WHERE t1.userId = @userId;", new { UserId = userId });
    }
    public async Task<User> GetUser(int id)
    {
        return await _sqlAccess.LoadUser<dynamic>("SELECT * FROM \"user\" WHERE userId = @userId; SELECT * FROM user_task_map t1 JOIN task t2 ON t2.taskId = t1.taskId WHERE t1.userId = @userId; SELECT * FROM project_user_map t1 JOIN project t2 ON t2.projectId = t1.projectId WHERE t1.userId = @userId;", new { UserId = id });
    }
    public async Task InsertUser(SignInCredentials user)
    {
        await _sqlAccess.SaveData<dynamic>("INSERT INTO \"user\" (username, password) VALUES(@Username, @Password)", new { user.Username, user.Password });
    }
    public async Task DeleteUser(int userId)
    {
        await _sqlAccess.SaveData<dynamic>("DELETE FROM \"user\" WHERE userid = @userId", new { userId });
    }
    public UserData(ISqlAccess sqlAccess)
    {
        _sqlAccess = sqlAccess;
    }
}
