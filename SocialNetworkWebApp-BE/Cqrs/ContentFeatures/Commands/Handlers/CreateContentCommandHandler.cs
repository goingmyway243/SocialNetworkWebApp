using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ContentFeatures.Commands.Handlers
{
    public class CreateContentCommandHandler : IRequestHandler<CreateContentCommand, Guid>
    {
        private readonly IRepository<ContentEntity> _repository;

        public CreateContentCommandHandler(IRepository<ContentEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreateContentCommand request, CancellationToken cancellationToken)
        {
            var newContent = new ContentEntity();
            newContent.TextContent = request.TextContent;
            newContent.LinkContent = request.LinkContent;
            newContent.Type = request.Type;
            newContent.PostId = request.PostId;

            newContent.CreatedTime = DateTime.Now;
            newContent.UpdatedTime = DateTime.Now;

            return await _repository.Create(newContent);
        }
    }
}
