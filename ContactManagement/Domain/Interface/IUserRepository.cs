using ContactManagement.Model;

namespace ContactManagement.Domain.Interface
{
    public interface IUserRepository
    {
        User GetByPhoneNumber(string phoneNumber);
        void Add(User user); 
    }
}
