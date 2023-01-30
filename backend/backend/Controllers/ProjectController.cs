using DataAccess.Data;
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
}
