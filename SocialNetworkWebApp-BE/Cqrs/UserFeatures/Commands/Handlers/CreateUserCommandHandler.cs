using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.UserFeatures.Commands.Handlers
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Guid>
    {
        private readonly IRepository<UserEntity> _repository;

        public CreateUserCommandHandler(IRepository<UserEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var newUser = new UserEntity();

            newUser.Email = request.Email;
            newUser.Password = request.Password;
            newUser.FirstName = request.FirstName;
            newUser.LastName = request.LastName;
            newUser.Phone = request.Phone;
            newUser.DateOfBirth = request.DateOfBirth;
            newUser.Role = request.Role;

            newUser.CreatedTime = DateTime.Now;
            newUser.UpdatedTime = DateTime.Now;

            return await _repository.Create(newUser);
        }
    }
}
