using DataAccess.DbAccess;
using DataAccess.Models;

namespace DataAccess.Data;

public class ProjectData : IProjectData
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
    public async Task<IEnumerable<Project>> GetProjectsByUserId(int userId)
    {
        List<Project> result = new();
        var projects = await _sqlAccess.LoadData<Project, dynamic>("SELECT * FROM project;", new { });
        foreach (var project in projects)
        {
            result.Add(await GetProjectById((int)project.ProjectId));
        }
        var filtered = result.Where(proj => proj.UsersAssigned.Any(user => user.UserId == userId));
        if (!filtered.Any())
        {
            throw new Exception("Didn't find any projects by this user");
        }
        return filtered;
    }
    public async Task CompleteProject(int projectId)
    {
        await _sqlAccess.SaveData<dynamic>("UPDATE project SET completed = 'true', completed_at = NOW() WHERE projectid = @projectId;", new { projectId });
    }
    public async Task UpdateProject(Update_AddProject upProduct)
    {
        await _sqlAccess.SaveData<dynamic>("UPDATE project SET title = @title, description = @description, due_date = @due_date WHERE projectid = @projectId;", new { upProduct.Title, upProduct.Description, upProduct.Due_date, upProduct.ProjectId });
    }
    public async Task<Project> GetProjectById(int projectId)
    {
        return await _sqlAccess.LoadProject<dynamic>("SELECT * FROM project WHERE projectId = @ProjectId; SELECT * FROM task WHERE task.projectId = @ProjectId; SELECT t1.userId, username FROM \"user\" t1 JOIN project_user_map t2 ON t1.userId = t2.userId WHERE t2.projectId = @ProjectId", new { projectId });
    }
    public async Task AssignUserToProject(int projectId, int userId)
    {
        await _sqlAccess.SaveData("INSERT INTO project_user_map (projectid, userid) VALUES (@projectId, @userId)", new { projectId, userId });
    }
    public async Task InsertProject(Update_AddProject project)
    {
        if (project.Due_date is not null)
        {
            await _sqlAccess.SaveData("INSERT INTO project (title, description, due_date) VALUES(@title, @description, @due_date)", new { project.Title, project.Description, project.Due_date });
        }
        else
        {
            await _sqlAccess.SaveData("INSERT INTO project (title, description) VALUES(@title, @description)", new { project.Title, project.Description });
        }
    }
    public async Task DeleteProject(int projectId)
    {
        await _sqlAccess.SaveData<dynamic>("DELETE FROM project WHERE projectid = @projectId", new { projectId });
    }
    public ProjectData(ISqlAccess sqlAccess)
    {
        _sqlAccess = sqlAccess;
    }
}
