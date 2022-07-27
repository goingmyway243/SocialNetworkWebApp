using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ContentFeatures.Commands.Handlers
{
    public class UpdateContentCommandHandler : IRequestHandler<UpdateContentCommand, Guid>
    {
        private readonly IRepository<ContentEntity> _repository;

        public UpdateContentCommandHandler(IRepository<ContentEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(UpdateContentCommand request, CancellationToken cancellationToken)
        {
            var contentToUpdate = await _repository.GetById(request.Id);

            if (contentToUpdate == null)
            {
                return default;
            }

            contentToUpdate.TextContent = request.TextContent;
            contentToUpdate.LinkContent = request.LinkContent;
            contentToUpdate.UpdatedTime = DateTime.Now;

            return await _repository.Update(contentToUpdate);
        }
    }
}
