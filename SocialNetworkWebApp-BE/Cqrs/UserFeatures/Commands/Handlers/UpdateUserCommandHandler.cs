using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.UserFeatures.Commands.Handlers
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Guid>
    {
        private readonly IRepository<UserEntity> _repository;

        public UpdateUserCommandHandler(IRepository<UserEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var userToUpdate = await _repository.GetById(request.Id);

            if (userToUpdate == null)
            {
                return default;
            }

            userToUpdate.Email = request.Email;
            userToUpdate.Password = request.Password;
            userToUpdate.FirstName = request.FirstName;
            userToUpdate.LastName = request.LastName;
            userToUpdate.Phone = request.Phone;
            userToUpdate.DateOfBirth = request.DateOfBirth;
            userToUpdate.Role = request.Role;

            userToUpdate.UpdatedTime = DateTime.Now;

            return await _repository.Update(userToUpdate);
        }
    }
}
