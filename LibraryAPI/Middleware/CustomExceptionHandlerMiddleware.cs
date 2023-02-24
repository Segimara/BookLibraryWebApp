using Application.Common.Exceptions;
using FluentValidation;
using System.Net;
using System.Text.Json;

namespace LibraryAPI.Middleware
{
    public class CustomExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExeptionAsync(httpContext, ex);
            }
        }

        private Task HandleExeptionAsync(HttpContext httpContext, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError;
            var results = string.Empty;
            switch (ex)
            {
                case ValidationException validationException:
                    code = HttpStatusCode.BadRequest;
                    results = JsonSerializer.Serialize(validationException.Errors);
                    break;
                case NotFoundException:
                    code = HttpStatusCode.NotFound;
                    break;
                case ForbiddenException:
                    code = HttpStatusCode.Forbidden;
                    break;
            }
            httpContext.Response.ContentType = "application/json";
            httpContext.Response.StatusCode = (int)code;
            if (results == string.Empty)
            {
                results = JsonSerializer.Serialize(new { errpr = ex.Message });
            }
            return httpContext.Response.WriteAsync(results);
        }
    }
}
