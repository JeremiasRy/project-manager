using DataAccess.Data;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TaskController
{
    [HttpGet]
    public async Task<IResult> GetTasks([FromServices] ITaskData data)
    {
        try
        {
            return Results.Ok(await data.GetTasks());
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [HttpGet("user/{id}")]
    public async Task<IResult> GetTasks([FromServices] ITaskData data, [FromRoute] int id)
    {
        try
        {
            return Results.Ok(await data.GetTasks(id));
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [HttpPost("complete/{id}")]
    public async Task<IResult> CompleteTask([FromServices] ITaskData data, [FromRoute] int id)
    {
        try
        {
            var task = await data.GetTask(id);
            await data.CompleteTask(id);
            return Results.Ok($"Completed task {task.Title}");
        } catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [HttpPost("assign")]
    public async Task<IResult> AssignTaskToUser([FromServices] ITaskData data, [FromServices] IUserData userCheck, [FromBody] Assign assign)
    {
        try
        {
            var user = await userCheck.GetUser(assign.UserId);
            var task = await data.GetTask(assign.AssignId);
            if (user == null)
            {
                throw new ArgumentException("Cant find user");
            }
            if (task == null)
            {
                throw new ArgumentException("Cant find task");
            }
            await data.AssingTaskToUser(assign.AssignId, assign.UserId);
            return Results.Ok(new { Assigned = user.Username, To = task.Title });
        } catch (Exception ex)
        {
            return Results.BadRequest(ex.Message);
        }
    }
    [HttpPost]
    public async Task<IResult> InsertTask([FromServices] ITaskData data, [FromBody] Update_AddTask newTask)
    {
        try
        {
            if (newTask is null || newTask.ProjectId == null || newTask.Description == null || newTask.Title == null)
            {
                throw new ArgumentException("Some fields were not filled correctly");
            }

            await data.InsertTask(newTask);
            return Results.Ok(new {newTask.Title, newTask.Description});
        } catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [HttpPut]
    public async Task<IResult> UpdateTask([FromServices] ITaskData data, [FromBody] Update_AddTask upTask)
    {
        try
        {
            if (upTask is null || upTask.TaskId is null)
            {
                throw new ArgumentException("Null values inside the update object");
            }
            await data.UpdateTask(upTask);
            return Results.Ok(await data.GetTask((int)upTask.TaskId));
        } catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
        
    }
    [HttpDelete("{id}")]
    public async Task<IResult> DeleteTask([FromServices] ITaskData data, [FromRoute] int id)
    {
        try
        {
            var task = await data.GetTask(id);
            await data.DeleteTask(id);
            return Results.Ok(task);
        } catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
}
