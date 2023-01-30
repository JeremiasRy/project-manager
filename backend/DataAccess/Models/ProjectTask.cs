using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models;

public class ProjectTask
{
    public int? TaskId { get; set; }
    public int? ProjectId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public bool? Completed { get; set; }
    public DateTime? Created_At { get; set; }
    public DateTime? Completed_At { get; set; }
    public Project? Project { get; set; }
    public User? UserAssigned { get; set; }
}
