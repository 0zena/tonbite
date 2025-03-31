using Tonbite.Api.Http.Services;

namespace Tonbite.Api.Http.Core;

public static class ScopedServices
{
    /// <summary> Adds all scoped http services. </summary>
    /// <param name="services">A collection of services for the application to compose.</param>
    public static void AddScopedServices(this IServiceCollection services)
    {
        services.AddScoped<IUserHttpService, UserHttpService>();
        services.AddScoped<ICourseHttpService, CourseHttpService>();
        services.AddScoped<ICourseStepHttpService, CourseStepHttpService>();
        services.AddScoped<ITransactionHttpService, TransactionHttpService>();
    }
}