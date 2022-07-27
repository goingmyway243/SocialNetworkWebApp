using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Queries.Handlers
{
    public class GetChatroomByIdQueryHandler : IRequestHandler<GetChatroomByIdQuery, ChatroomEntity>
    {
        private readonly IRepository<ChatroomEntity> _repository;

        public GetChatroomByIdQueryHandler(IRepository<ChatroomEntity> repository)
        {
            _repository = repository;
        }

        public async Task<ChatroomEntity> Handle(GetChatroomByIdQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetById(request.Id);
        }
    }
}
