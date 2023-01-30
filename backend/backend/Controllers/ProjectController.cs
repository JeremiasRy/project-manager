using DataAccess.Data;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectController
{
    [HttpGet]
    public async Task<IResult> GetProjects([FromServices] IProjectData data)
    {
        try
        {
            return Results.Ok(await data.GetProjects());
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [HttpPost("assign/")]
    public async Task<IResult> AssignProjectToUser([FromServices] IProjectData data, [FromServices] IUserData userCheck, [FromBody] Assign assign)
    {
        var user = await userCheck.GetUser(assign.UserId);
        var project = await data.GetProjectById(assign.AssignId);

        if (user is null)
        {
            return Results.BadRequest("Can't find user");
        }
        if (project is null)
        {
            return Results.BadRequest("Can't find project");
        }
        try
        {
            await data.AssignUserToProject(assign.AssignId, assign.UserId);
            return Results.Ok(new { Assigned = user, To = project});
        } catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
}
