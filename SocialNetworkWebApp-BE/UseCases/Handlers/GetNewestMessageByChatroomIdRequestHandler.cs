using MediatR;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases.Handlers
{
    public class GetNewestMessageByChatroomIdRequestHandler : IRequestHandler<GetNewestMessageByChatroomIdRequest, MessageEntity>
    {
        private readonly IRepository<MessageEntity> _repository;

        public GetNewestMessageByChatroomIdRequestHandler(IRepository<MessageEntity> repository)
        {
            _repository = repository;
        }

        public async Task<MessageEntity> Handle(GetNewestMessageByChatroomIdRequest request, CancellationToken cancellationToken)
        {
            var listMessage = await _repository.GetAll();
            return listMessage
                .Where(message => message.ChatroomId == request.ChatroomId)
                .OrderByDescending(message => message.CreatedTime)
                .First();
        }
    }
}
