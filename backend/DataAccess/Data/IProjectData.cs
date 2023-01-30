using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IProjectData
    {
        Task AssignUserToProject(int projectId, int userId);
        Task<Project> GetProjectById(int projectId);
        Task<IEnumerable<Project>> GetProjects();
        Task InsertProject(Project project);
    }
}