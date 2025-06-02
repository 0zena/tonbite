using Microsoft.AspNetCore.Mvc;
using Tonbite.Api.Data;
using Tonbite.Api.Forms;

namespace Tonbite.Api.Controllers;

[ApiController]
[Route("/api/statistics")]
public class StatisticsController(ApplicationDbContext context) : ControllerBase
{
    [HttpGet]
    public SummaryForm GetSummary()
    {
        var today = DateTime.UtcNow.Date;
        var tomorrow = today.AddDays(1);
        
        return new()
        {
            PaymentsToday = context.Transactions.Count(x => x.Time >= today && x.Time < tomorrow),
            CreatedCoursesToday = context.Courses.Count(x => x.Created >= today && x.Created < tomorrow),
            AvaragePrice = context.Courses.Average(x => x.Price) ?? 0,
            TotalCourses = context.Courses.Count(),
            TotalPayments = context.Transactions.Count(),
            TotalUsers = context.Users.Count()
        };
    }
}