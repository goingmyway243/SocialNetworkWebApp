using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.UserFeatures.Commands.Handlers
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Guid>
    {
        private readonly IRepository<UserEntity> _repository;

        public DeleteUserCommandHandler(IRepository<UserEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var userToDelete = await _repository.GetById(request.Id);

            if (userToDelete == null)
            {
                return default;
            }

            return await _repository.Delete(userToDelete);
        }
    }
}
