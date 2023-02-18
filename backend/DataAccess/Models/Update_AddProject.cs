namespace DataAccess.Models;
public class Update_AddProject
{
    public int? ProjectId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime? Due_date { get; set; }
    public DateTime? Start_date { get; set; }
}
