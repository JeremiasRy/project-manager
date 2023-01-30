using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data;

public class TaskData
{
    private readonly ISqlAccess _sqlAccess;
    public async Task<IEnumerable<ProjectTask>> GetTasks()
    {
        var tasks = await _sqlAccess.LoadData<ProjectTask, dynamic>("SELECT * FROM task", new { });
        List<ProjectTask> result = new();
        foreach (var task in tasks)
        {
            result.Add(await GetTask((int)task.TaskId));
        }
        return result;
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
    public TaskData(ISqlAccess sqlAccess)
    {
        _sqlAccess = sqlAccess;
    }
}
