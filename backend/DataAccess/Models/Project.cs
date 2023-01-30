namespace DataAccess.Models;

public class Project
{
    public int? ProjectId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public bool? Completed { get; set; }
    public DateTime? Created_At { get; set; }
    public DateTime? Completed_At { get; set; }
    public DateTime? Due_date { get; set; }
    public ICollection<ProjectTask>? Tasks { get; set; }
    public ICollection<User>? UsersAssigned { get; set; }
}
