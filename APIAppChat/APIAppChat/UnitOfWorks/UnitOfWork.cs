using APIAppChat.Context;
using APIAppChat.Repository.Implement;
using APIAppChat.Repository.Interface;

namespace APIAppChat.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private DataContext _context;
        private IUserRepository userRepository;

        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        public IUserRepository UserRepository => this.userRepository ??= new UserRepository(_context);

        public DataContext DataContext => _context;

        public void Dispose()
        {
            _context.Dispose();
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}