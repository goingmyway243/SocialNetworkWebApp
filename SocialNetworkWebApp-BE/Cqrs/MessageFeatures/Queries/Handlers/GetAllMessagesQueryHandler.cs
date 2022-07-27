using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.MessageFeatures.Queries.Handlers
{
    public class GetAllMessagesQueryHandler : IRequestHandler<GetAllMessagesQuery, IEnumerable<MessageEntity>>
    {
        private readonly IRepository<MessageEntity> _repository;

        public GetAllMessagesQueryHandler(IRepository<MessageEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MessageEntity>> Handle(GetAllMessagesQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAll();
        }
    }
}
