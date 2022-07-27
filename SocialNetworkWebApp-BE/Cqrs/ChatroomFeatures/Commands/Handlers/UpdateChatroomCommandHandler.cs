using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Commands.Handlers
{
    public class UpdateChatroomCommandHandler : IRequestHandler<UpdateChatroomCommand, Guid>
    {
        private readonly IRepository<ChatroomEntity> _repository;

        public UpdateChatroomCommandHandler(IRepository<ChatroomEntity> repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(UpdateChatroomCommand request, CancellationToken cancellationToken)
        {
            var chatroomToUpdate = await _repository.GetById(request.Id);

            if (chatroomToUpdate == null)
            {
                return default;
            }

            chatroomToUpdate.ChatroomName = request.ChatroomName;
            chatroomToUpdate.UpdatedTime = DateTime.Now;

            return await _repository.Update(chatroomToUpdate);
        }
    }
}
