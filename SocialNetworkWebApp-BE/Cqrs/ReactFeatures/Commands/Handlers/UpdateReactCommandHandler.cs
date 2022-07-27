using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ReactFeatures.Commands.Handlers
{
    public class UpdateReactCommandHandler : IRequestHandler<UpdateReactCommand, Guid>
    {
        private readonly IRepository<ReactEntity> _repository;

        public UpdateReactCommandHandler(IRepository<ReactEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(UpdateReactCommand request, CancellationToken cancellationToken)
        {
            var reactToUpdate = await _repository.GetById(request.Id);

            if (reactToUpdate == null)
            {
                return default;
            }

            reactToUpdate.Type = request.Type;
            reactToUpdate.UpdatedTime = DateTime.Now;

            return await _repository.Update(reactToUpdate);
        }
    }
}
