namespace Application.Common.Exceptions
{
    public class ForbiddenException : Exception
    {
        public ForbiddenException() : base($"forbidden access")
        {

        }
    }
}
