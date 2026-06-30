using ContactManagement.Model;
using ContactManagement.Service.Interface;
using ContactManagement.UOW;

namespace ContactManagement.Service.Service
{
    public class ContactService : IContactService
    {

        private readonly IUnitofWork _unitOfWork;

        public ContactService(IUnitofWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Contact> AddContact(Contact contact)
        {
            await _unitOfWork.ContactRepository.Insert(contact);
            await _unitOfWork.SaveChangesAsync();
            return contact;

        }

        public async Task<bool> DeleteContact(int id)
        {
             
            var contact = await _unitOfWork.ContactRepository.GetById(id);
            if (contact == null)
            {
                return false;
            }

            
            _unitOfWork.ContactRepository.Delete(id);

         
            var result = await _unitOfWork.SaveChangesAsync();

       
            return result > 0;
        }




        public async Task<IEnumerable<Contact>> GetAllContacts()
        {
            return await _unitOfWork.ContactRepository.GetAll();
        }

        public async Task<List<Contact>> GetContactByCreatedDate(DateTime createdDate)
        {
            return await _unitOfWork.ContactRepository.GetContactByCreatedDate(createdDate);
        }

        public async Task<Contact> GetContactById(int id)
        {
            return await _unitOfWork.ContactRepository.GetById(id);
        }

        public async Task<List<Contact>> GetContactCreatedBy(int createdBy)
        {
            return await _unitOfWork.ContactRepository.GetContactCreatedBy(createdBy);
        }


        public async Task<Contact> UpdateContact(int id, Contact contact)
        {
            var existingContact = await _unitOfWork.ContactRepository.GetById(id);
            if (existingContact == null) return null;

            
            if (!string.IsNullOrWhiteSpace(contact.Name) && contact.Name != "string")
            {
                existingContact.Name = contact.Name;
            }

            
            if (!string.IsNullOrWhiteSpace(contact.Email) && contact.Email != "string")
            {
                existingContact.Email = contact.Email;
            }

            
            if (!string.IsNullOrWhiteSpace(contact.Phone) && contact.Phone != "string")
            {
                existingContact.Phone = contact.Phone;
            }

             
            if (!string.IsNullOrWhiteSpace(contact.Address) && contact.Address != "string")
            {
                existingContact.Address = contact.Address;
            }

            _unitOfWork.ContactRepository.Update(existingContact);
            await _unitOfWork.SaveChangesAsync();

            return existingContact;
        }



    }
}
