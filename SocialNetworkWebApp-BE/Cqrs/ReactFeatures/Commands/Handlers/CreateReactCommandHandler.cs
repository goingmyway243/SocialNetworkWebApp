using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ReactFeatures.Commands.Handlers
{
    public class CreateReactCommandHandler : IRequestHandler<CreateReactCommand, Guid>
    {
        private readonly IRepository<ReactEntity> _repository;

        public CreateReactCommandHandler(IRepository<ReactEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(CreateReactCommand request, CancellationToken cancellationToken)
        {
            var newReact = new ReactEntity();
            newReact.Type = request.Type;
            newReact.PostId = request.PostId;
            newReact.UserId = request.UserId;

            newReact.CreatedTime = DateTime.Now;
            newReact.UpdatedTime = DateTime.Now;

            return await _repository.Create(newReact);
        }
    }
}
