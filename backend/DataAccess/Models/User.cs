namespace DataAccess.Models;

public class User
{
    public int? UserId { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public DateTime? Created_At { get; set; }
    public ICollection<Project>? Projects { get; set; }
    public ICollection<ProjectTask>? Tasks { get; set; }
}
