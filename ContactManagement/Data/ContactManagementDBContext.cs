using ContactManagement.Model;
using Microsoft.EntityFrameworkCore;

namespace ContactManagement.Data
{
    public class ContactManagementDBContext : DbContext
    {
        public ContactManagementDBContext(DbContextOptions<ContactManagementDBContext> options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }

    }
}
