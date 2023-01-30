using DataAccess.Models;

namespace DataAccess.Data
{
    public interface ITaskData
    {
        Task AssingTaskToUser(int taskId, int userId);
        Task<ProjectTask> GetTask(int taskId);
        Task<IEnumerable<ProjectTask>> GetTasks();
    }
}