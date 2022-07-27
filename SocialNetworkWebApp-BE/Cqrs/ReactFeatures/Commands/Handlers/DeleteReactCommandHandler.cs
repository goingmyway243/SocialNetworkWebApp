using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ReactFeatures.Commands.Handlers
{
    public class DeleteReactCommandHandler : IRequestHandler<DeleteReactCommand, Guid>
    {
        private readonly IRepository<ReactEntity> _repository;

        public DeleteReactCommandHandler(IRepository<ReactEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(DeleteReactCommand request, CancellationToken cancellationToken)
        {
            var reactToDelete = await _repository.GetById(request.Id);

            if(reactToDelete == null)
            {
                return default;
            }

            return await _repository.Delete(reactToDelete);
        }
    }
}
