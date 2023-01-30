using DataAccess.Data;
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
}
