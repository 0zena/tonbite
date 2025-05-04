namespace Tonbite.Api.Forms;

public class SummaryForm
{
    public int PaymentsToday { get; set; }
    
    public int CreatedCoursesToday { get; set; }
    
    public double? AvaragePrice { get; set; }
    
    public int TotalCourses { get; set; }
    
    public int TotalUsers { get; set; }
    
    public int TotalPayments { get; set; }
}