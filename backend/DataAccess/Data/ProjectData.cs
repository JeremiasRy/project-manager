using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data;

public class ProjectData
{
    private readonly ISqlAccess _sqlAccess;
    public async Task<IEnumerable<Project>> GetProjects()
    {
        List<Project> result = new();
        var projects = await _sqlAccess.LoadData<Project, dynamic>("SELECT * FROM project;", new { });
        foreach (var project in projects)
        {
            result.Add(await GetProjectById((int)project.ProjectId));
        }
        return result;
    }
    public async Task<Project> GetProjectById(int projectId)
    {
        return await _sqlAccess.LoadProject<dynamic>("SELECT * FROM project WHERE projectId = @ProjectId; SELECT * FROM task WHERE task.projectId = @ProjectId; SELECT t1.userId, username FROM \"user\" t1 JOIN project_user_map t2 ON t1.userId = t2.userId WHERE t2.projectId = @ProjectId", new { projectId });
    }
    public ProjectData(ISqlAccess sqlAccess)
    {
        _sqlAccess = sqlAccess;
    }
}
