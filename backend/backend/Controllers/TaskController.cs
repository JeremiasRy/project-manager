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
    [HttpPost("assign")]
    public async Task<IResult> AssignTaskToUser([FromServices] ITaskData data, [FromServices] IUserData userCheck, [FromBody] Assign assign)
    {
        try
        {
            var user = await userCheck.GetUser(assign.UserId);
            var task = await data.GetTask(assign.AssignId);
            if (user == null)
            {
                return Results.BadRequest("Can't find user");
            }
            if (task == null)
            {
                return Results.BadRequest("Can't find task");
            }
            try
            {
                await data.AssingTaskToUser(assign.AssignId, assign.UserId);
                return Results.Ok(new { Assigned = user.Username, To = task.Title });
            }
            catch
            {
                return Results.BadRequest("Cant assign");
            }
        } catch
        {
            return Results.BadRequest("User or task id is invalid");
        }
    }
}
