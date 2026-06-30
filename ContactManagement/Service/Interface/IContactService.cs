using ContactManagement.Model;

namespace ContactManagement.Service.Interface
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetAllContacts();
        Task<Contact> GetContactById(int id);

        Task<Contact> AddContact(Contact contact);
        Task<Contact> UpdateContact(int id, Contact contact);
        Task<bool> DeleteContact(int id);

        Task<List<Contact>> GetContactCreatedBy(int createdBy);
        Task<List<Contact>> GetContactByCreatedDate(DateTime createdDate);




    }
}
