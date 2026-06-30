
using ContactManagement.Data;
using ContactManagement.Domain.Interface;
using ContactManagement.Model;

namespace ContactManagement.Domain.Repository
{
    public class UserRepository : IUserRepository
    {

        private readonly ContactManagementDBContext _context;

        public UserRepository(ContactManagementDBContext context)
        {
            _context = context;
        }

        public void Add(User user)
        {
            _context.Users.Add(user);
        }

        public User GetByPhoneNumber(string phoneNumber)
        {
            return _context.Users.FirstOrDefault(u => u.PhoneNumber == phoneNumber);

        }
    }
}
