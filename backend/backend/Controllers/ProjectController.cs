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
    [HttpGet("{id}")]
    public async Task<IResult> GetProjectById([FromServices] IProjectData data, [FromRoute] int id)
    {
        try
        {
            return Results.Ok(await data.GetProjectById(id));
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [HttpGet("user/{id}")]
    public async Task<IResult> GetProjectsByUser([FromServices] IProjectData data, [FromRoute] int id)
    {
        try
        {
            return Results.Ok(await data.GetProjectsByUserId(id));
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
    [HttpPut]
    public async Task<IResult> UpdateProject([FromServices] IProjectData data, [FromBody] Update_AddProject upProduct)
    {
        try
        {
            if (upProduct is null || upProduct.ProjectId is null)
            {
                throw new ArgumentException("Null values inside udate object");
            }
            await data.UpdateProject(upProduct);
            return Results.Ok(await data.GetProjectById((int)upProduct.ProjectId));
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
            return Results.Ok(new { Assigned = user.Username, To = project.Title });
        }
        catch
        {
            return Results.Problem("User already assigned");
        }
    }
    [HttpPost]
    public async Task<IResult> InsertProject([FromServices] IProjectData data, [FromBody] Update_AddProject newProject)
    {
        try
        {
            if (newProject is null || newProject.Description is null || newProject.Title is null)
            {
                throw new ArgumentException("No new project to add");
            }
            else
            {
                var projects = await data.GetProjects();
                if (projects is null)
                {
                    throw new Exception("Something went wrong while checking duplicates");
                }
                var duplicateCheckEnumerable = projects
                    .Select(project =>
                    {
                        if (project.Description is null || project.Title is null)
                        {
                            throw new Exception("You should do some cleaning for the database");
                        }
                        return new { Description = project.Description.ToLower(), Title = project.Title.ToLower() };
                    });

                if (duplicateCheckEnumerable.Any(names => newProject.Title.ToLower() == names.Title && newProject.Description.ToLower() == names.Description))
                {
                    return Results.Problem("Project with this title and description already exists");
                }

                await data.InsertProject(newProject);
                return Results.Ok(new { newProject.Title, newProject.Description });
            }
        }
        catch (Exception ex)
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
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
}
