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
        return new()
        {
            PaymentsToday = context.Transactions.Count(x => x.Time.Day == DateTime.Today.Day),
            CreatedCoursesToday = context.Courses.Count(x => x.Created.Day == DateTime.Today.Day),
            AvaragePrice = context.Courses.Average(x => x.Price),
            TotalCourses = context.Courses.Count(),
            TotalPayments = context.Transactions.Count(),
            TotalUsers = context.Users.Count()
        };
    }
}