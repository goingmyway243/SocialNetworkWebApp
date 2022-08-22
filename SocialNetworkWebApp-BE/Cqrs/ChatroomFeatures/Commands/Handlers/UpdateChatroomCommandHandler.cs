using AutoMapper;
using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Commands.Handlers
{
    public class UpdateChatroomCommandHandler : IRequestHandler<UpdateChatroomCommand, Guid>
    {
        private readonly IRepository<ChatroomEntity> _repository;
        private readonly IMapper _mapper;

        public UpdateChatroomCommandHandler(IRepository<ChatroomEntity> repository,IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Guid> Handle(UpdateChatroomCommand request, CancellationToken cancellationToken)
        {
            var chatMembers = request.ChatMembers
                .Select(member => _mapper.Map<UserEntity>(member))
                .ToList();
            var chatroomToUpdate = await _repository.GetById(request.Id);

            if (chatroomToUpdate == null)
            {
                return default;
            }

            chatroomToUpdate.ChatroomName = request.ChatroomName;
            chatroomToUpdate.ChatMembers = chatMembers;
            chatroomToUpdate.UpdatedTime = DateTime.Now;

            return await _repository.Update(chatroomToUpdate);
        }
    }
}
