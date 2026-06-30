using ContactManagement.Data;
using ContactManagement.Domain.Interface;

namespace ContactManagement.UOW
{
    public class UnitofWork : IUnitofWork
    {
        private readonly ContactManagementDBContext _dbContext;

        
        public IContactRepository ContactRepository { get; }

        public IUserRepository UserRepository { get; }

        public UnitofWork(ContactManagementDBContext dbContext, IContactRepository contactRepository, IUserRepository userRepository)
        {
            _dbContext = dbContext;
            ContactRepository = contactRepository;
            UserRepository = userRepository;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public void Dispose()
            {
                _dbContext.Dispose();
        }




    }
}
