using ContactManagement.Model;
using ContactManagement.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ContactManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

         
        [HttpGet("GetAllContacts")]
        public async Task<IActionResult> GetAllContacts()
        {
            var contacts = await _contactService.GetAllContacts();

            return Ok(new
            {
                Success = true,
                Message = "Contacts retrieved successfully.",
                Data = contacts
            });
        }

         
        [HttpGet("GetAllContactById/{id:int}")]
        public async Task<IActionResult> GetAllContactById(int id)
        {
            var contact = await _contactService.GetContactById(id);
            if (contact == null)
            {
                return NotFound(new { Success = false, Message = $"Contact with ID {id} not found." });
            }

            return Ok(new { Success = true, Message = "Contact found.", Data = contact });
        }

        
        [HttpPost("AddContact")]
        public async Task<IActionResult> AddContact([FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest(new { Success = false, Message = "Contact data is required." });
            }

            var response = await _contactService.AddContact(contact);
            return Ok(response);  
        }

        
        [HttpPut("UpdateContact/{id:int}")]
        public async Task<IActionResult> UpdateContact(int id, [FromBody] Contact contact)
        {
            if (contact == null || id != contact.Id)
            {
                return BadRequest(new { Success = false, Message = "Invalid input data or ID mismatch." });
            }

           
            var updatedContact = await _contactService.UpdateContact(id, contact);

            if (updatedContact == null)
            {
                return NotFound(new { Success = false, Message = "Contact update failed. Contact not found." });
            }

            return Ok(new
            {
                Success = true,
                Message = "Contact updated successfully!",
                Data = updatedContact
            });
        }

         
        [HttpDelete("DeleteContact/{id:int}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var response = await _contactService.DeleteContact(id);
            return Ok(response);  
        }
    }
}