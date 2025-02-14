using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Tonbite.Api.Identity;

/// <summary>
/// Enforces authorization based on a specific claim policy.
/// </summary>
/// <remarks>
/// This attribute verifies if the authenticated user possesses the specified claim.
/// If the user lacks the required claim, access is denied with a <see cref="ForbidResult"/>.
/// </remarks>
/// <param name="claimName">The name of the claim to check.</param>
/// <param name="claimValue">
/// The required claim value.  
/// If <c>true</c>, the user must have this claim.  
/// If <c>false</c>, the user must not have this claim.
/// </param>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RequiresClaimAttribute(string claimName, string claimValue) : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!context.HttpContext.User.HasClaim(claimName, claimValue))
            context.Result = new ForbidResult();
    }
}