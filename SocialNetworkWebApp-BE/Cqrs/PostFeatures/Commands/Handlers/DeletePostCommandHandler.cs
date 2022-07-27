using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.PostFeatures.Commands.Handlers
{
    public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand, Guid>
    {
        private readonly IRepository<PostEntity> _repository;

        public DeletePostCommandHandler(IRepository<PostEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            var postToDelete = await _repository.GetById(request.Id);

            if(postToDelete == null)
            {
                return default;
            }

            return await _repository.Delete(postToDelete);
        }
    }
}
