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
    [HttpGet("user/{id}")]
    public async Task<IResult> GetProject([FromServices] IProjectData data, [FromRoute] int id)
    {
        try
        {
            return Results.Ok(await data.GetProjects(id));
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [HttpPost("complete/{id}")]
    public async Task<IResult> CompleteProject([FromServices] IProjectData data, [FromRoute] int id)
    {
        try
        {
            var project = await data.GetProjectById(id);
            if (project.Tasks.Any(task => task.Completed == false))
            {
                return Results.Problem("Not all tasks are completed");
            };
            await data.CompleteProject(id);
            return Results.Ok($"Completed project: {project.Title}");
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
            return Results.Ok(new { Assigned = user.Username, To = project.Title});
        } catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [HttpPost]
    public async Task<IResult> InsertProject([FromServices] IProjectData data, [FromBody] Update_AddProject newProject)
    {
       try
        {
            await data.InsertProject(newProject);
            return Results.Ok(new { newProject.Title, newProject.Description });
        } catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [HttpDelete("{id}")]
    public async Task<IResult> DeleteProject([FromServices] IProjectData data, [FromRoute] int id)
    {
        try
        {
            var project = await data.GetProjectById(id);
            await data.DeleteProject(id);
            return Results.Ok(project);
        } catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
}
