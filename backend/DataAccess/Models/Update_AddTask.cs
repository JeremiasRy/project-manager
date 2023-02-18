using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models;

public class Update_AddTask
{
    public int? TaskId { get; set; }
    public int? ProjectId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime? Due_date { get; set; }
    public DateTime? Start_date { get; set; }
}
