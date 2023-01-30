using DataAccess.Models;

namespace DataAccess.Data
{
    public interface ITaskData
    {
        Task<ProjectTask> GetTask(int taskId);
        Task<IEnumerable<ProjectTask>> GetTasks();
    }
}