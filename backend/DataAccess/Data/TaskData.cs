using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data;

public class TaskData : ITaskData
{
    private readonly ISqlAccess _sqlAccess;
    public async Task<IEnumerable<ProjectTask>> GetTasks()
    {
        var tasks = await _sqlAccess.LoadData<ProjectTask, dynamic>("SELECT * FROM task", new { });
        List<ProjectTask> result = new();
        foreach (var task in tasks)
        {
            if (task.TaskId is not null)
            {
                result.Add(await GetTask((int)task.TaskId));
            }
        }
        return result;
    }
    public async Task<IEnumerable<ProjectTask>> GetTasks(int userId)
    {
        var tasks = await _sqlAccess.LoadData<ProjectTask, dynamic>("SELECT * FROM task", new { });
        List<ProjectTask> result = new();
        foreach (var task in tasks)
        {
            if (task.TaskId is not null)
            {
                result.Add(await GetTask((int)task.TaskId));
            }
        }
        return result.Where(task => task.UserAssigned.UserId == userId);
    }
    public async Task CompleteTask(int taskId)
    {
        await _sqlAccess.SaveData<dynamic>("UPDATE task SET completed = 'true', completed_at = NOW() WHERE taskid = @taskId", new { taskId });
    }
    public async Task<ProjectTask> GetTask(int taskId)
    {
        var task = await _sqlAccess.LoadData<ProjectTask, dynamic>("SELECT * FROM task WHERE task.taskId = @taskId", new { taskId });
        if (task != null)
        {
            return await _sqlAccess.LoadTask<dynamic>("SELECT * FROM task WHERE taskId = @taskId; SELECT * FROM project WHERE projectId = @projectId; SELECT t1.userid, username FROM user_task_map t1 JOIN \"user\" t2 ON t1.userId = t2.userId WHERE t1.taskId = @taskId", new { taskId, projectId = task.First().ProjectId });
        }
        else
        {
            throw new Exception("Ran into a null task");
        }
    }
    public async Task AssingTaskToUser(int taskId, int userId)
    {
        await _sqlAccess.SaveData("INSERT INTO user_task_map(userid, taskid) VALUES(@userId, @taskId)", new { taskId, userId });
    }
    public async Task InsertTask(Update_AddTask task)
    {
        if (task.Due_date is not null && task.Start_date is not null)
        {
            await _sqlAccess.SaveData("INSERT INTO task (title, description, due_date, start_date, projectid) VALUES(@title, @description, @due_date, @start_Date, @projectid);", new { task.Title, task.Description, task.Due_date, task.Start_date, task.ProjectId });
        } else if (task.Due_date is null && task.Start_date is not null)
        {
            await _sqlAccess.SaveData("INSERT INTO task (title, description, start_date, projectid) VALUES(@title, @description, @start_Date, @projectid);", new { task.Title, task.Description, task.Start_date, task.ProjectId });
        } else if (task.Due_date is not null && task.Start_date is null)
        {
            await _sqlAccess.SaveData("INSERT INTO task (title, description, due_date, projectid) VALUES(@title, @description, @due_date, @projectid);", new { task.Title, task.Description, task.Due_date, task.ProjectId });
        } else
        {
            await _sqlAccess.SaveData("INSERT INTO task (title, description, projectid) VALUES(@title, @description, @projectid);", new { task.Title, task.Description, task.ProjectId });
        }
    }
    public async Task UpdateTask(Update_AddTask task)
    {
        await _sqlAccess.SaveData("UPDATE task SET title = @title, description = @description, due_date = @due_date WHERE taskid = @taskId", new { task.Title, task.Description, task.Due_date, task.TaskId });
    }
    public async Task DeleteTask(int taskId)
    {
        await _sqlAccess.SaveData<dynamic>("DELETE FROM task WHERE taskid = @taskId", new { taskId });
    }
    public TaskData(ISqlAccess sqlAccess)
    {
        _sqlAccess = sqlAccess;
    }
}
