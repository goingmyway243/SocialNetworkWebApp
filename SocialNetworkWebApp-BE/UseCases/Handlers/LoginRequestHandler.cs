using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class LoginRequestHandler : IRequestHandler<LoginRequest, Guid>
    {
        private readonly IRepository<UserEntity> _repository;

        public LoginRequestHandler(IRepository<UserEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var listUsers = await _repository.GetAll();

            if (listUsers.Any())
            {
                var auditUser = listUsers.FirstOrDefault(user =>
                user.Email == request.Email &&
                user.Password == request.Password);

                if (auditUser != null)
                {
                    return auditUser.Id;
                }
            }

            throw new Exception("Email or Password is incorrect!");
        }
    }
}
