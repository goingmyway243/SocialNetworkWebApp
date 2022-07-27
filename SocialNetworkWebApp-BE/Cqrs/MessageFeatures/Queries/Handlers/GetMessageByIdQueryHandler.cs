using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.MessageFeatures.Queries.Handlers
{
    public class GetMessageByIdQueryHandler : IRequestHandler<GetMessageByIdQuery, MessageEntity>
    {
        private readonly IRepository<MessageEntity> _repository;

        public GetMessageByIdQueryHandler(IRepository<MessageEntity> repository)
        {
            _repository = repository;
        }

        public async Task<MessageEntity> Handle(GetMessageByIdQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetById(request.Id);
        }
    }
}
