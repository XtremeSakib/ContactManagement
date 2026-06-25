using ContactManagement.Data;
using ContactManagement.Domain.Interface;
using Microsoft.EntityFrameworkCore;

namespace ContactManagement.Domain.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly ContactManagementDBContext _contactManagementDBContext;

        public GenericRepository(ContactManagementDBContext contactManagementDBContext)
        {
            _contactManagementDBContext = contactManagementDBContext;

        }

        public async Task Delete(int id)
        {
            var entity = await GetById(id);
            _contactManagementDBContext.Set<T>().Remove(entity);

        }

        public async Task<IEnumerable<T>> GetAll()
        { 
            return await _contactManagementDBContext.Set<T>().ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _contactManagementDBContext.Set<T>().FindAsync(id);
        }

        public async Task Insert(T entity)
        {
            await _contactManagementDBContext.Set<T>().AddAsync(entity);
        }

        public async Task Update(T entity)
        {
            _contactManagementDBContext.Set<T>().Update(entity);
        }
    }
}
