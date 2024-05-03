﻿
namespace Services.API.Gateway
{
    // Register API Typical errors with custom messages
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.Response.HasStarted && !IsUserEndpoint(context.Request.Path) && !IsRoomEndpoint(context.Request.Path) && !IsTaskEndpoint(context.Request.Path) && !IsTaskHistoryEndpoint(context.Request.Path))
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                await context.Response.WriteAsync("La URL solicitada no es válida.");
                return;
            }
            try
            {
                await _next(context);
                if (context.Response.StatusCode == StatusCodes.Status405MethodNotAllowed)
                {
                    await context.Response.WriteAsync("Método no permitido para esta URL.");
                }
                else if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
                {
                    await context.Response.WriteAsync("Rol inválido para esta petición.");
                }
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            if (exception is FormatException)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                return context.Response.WriteAsync("Formato inválido para el Id, debe ser una cadena hexadecimal de 24 dígitos válida.");
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                return context.Response.WriteAsync(exception.Message);
            }
        }
        private bool IsUserEndpoint(PathString path)
        {
            return path.StartsWithSegments("/User");
        }
        private bool IsRoomEndpoint(PathString path)
        {
            return path.StartsWithSegments("/Room");
        }
        private bool IsTaskEndpoint(PathString path)
        {
            return path.StartsWithSegments("/Task");
        }
        private bool IsTaskHistoryEndpoint(PathString path)
        {
            return path.StartsWithSegments("/TaskHistory");
        }
    }
}