namespace ContactManagement.Service.Interface
{
    public interface IAuthService
    {
         bool Register(string phoneNumber, string password);
         String Login (string phoneNumber, string password);
    }
}
