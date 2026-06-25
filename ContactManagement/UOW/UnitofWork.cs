using ContactManagement.Data;
using ContactManagement.Domain.Interface;

namespace ContactManagement.UOW
{
    public class UnitofWork : IUnitofWork
    {
        private readonly ContactManagementDBContext _dbContext;

        
        public IContactRepository ContactRepository { get; }



        public UnitofWork(ContactManagementDBContext dbContext, IContactRepository contactRepository)
        {
            _dbContext = dbContext;
            ContactRepository = contactRepository;

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
