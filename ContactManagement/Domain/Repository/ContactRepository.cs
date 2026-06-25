using ContactManagement.Data;
using ContactManagement.Domain.Interface;
using ContactManagement.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace ContactManagement.Domain.Repository
{
    public class ContactRepository : GenericRepository<Contact>, IContactRepository
    {
        private readonly ContactManagementDBContext _dbContext;

        public ContactRepository(ContactManagementDBContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Contact>> GetContactByCreatedDate(DateTime createdDate)
        {
            var contacts = await _dbContext.Contacts.Where(c => c.CreatedDate.Date == createdDate.Date).ToListAsync();
            return contacts;

        }

        public async Task<List<Contact>> GetContactCreatedBy(int createdBy)
        {
            var contacts = await _dbContext.Contacts.Where(c => c.CreatedBy == createdBy).ToListAsync();
            return contacts;
        }
    }
}
