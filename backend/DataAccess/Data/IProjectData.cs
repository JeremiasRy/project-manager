using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IProjectData
    {
        Task AssignUserToProject(int projectId, int userId);
        Task CompleteProject(int projectId);
        Task<Project> GetProjectById(int projectId);
        Task<IEnumerable<Project>> GetProjects();
        Task<IEnumerable<Project>> GetProjects(int userId);
        Task InsertProject(Project project);
    }
}