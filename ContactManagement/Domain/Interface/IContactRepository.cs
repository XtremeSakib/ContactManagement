using ContactManagement.Model;

namespace ContactManagement.Domain.Interface
{
    public interface IContactRepository : IGenericRepository<Contact>
    {

        Task<List<Contact>> GetContactCreatedBy(int createdBy);
        Task<List<Contact>> GetContactByCreatedDate(DateTime createdDate);

    }
}
