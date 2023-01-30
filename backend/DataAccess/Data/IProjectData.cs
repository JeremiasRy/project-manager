using DataAccess.Models;

namespace DataAccess.Data
{
    public interface IProjectData
    {
        Task<Project> GetProjectById(int projectId);
        Task<IEnumerable<Project>> GetProjects();
    }
}