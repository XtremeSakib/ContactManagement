using ContactManagement.Domain.Interface;

namespace ContactManagement.UOW
{
    public interface IUnitofWork : IDisposable
    {

        IContactRepository ContactRepository { get; }
        Task<int> SaveChangesAsync();

    }
}
