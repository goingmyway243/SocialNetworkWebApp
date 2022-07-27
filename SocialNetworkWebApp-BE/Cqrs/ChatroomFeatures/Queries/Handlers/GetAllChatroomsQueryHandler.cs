using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Queries.Handlers
{
    public class GetAllChatroomsQueryHandler : IRequestHandler<GetAllChatroomsQuery, IEnumerable<ChatroomEntity>>
    {
        private readonly IRepository<ChatroomEntity> _repository;

        public GetAllChatroomsQueryHandler(IRepository<ChatroomEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ChatroomEntity>> Handle(GetAllChatroomsQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAll();
        }
    }
}
