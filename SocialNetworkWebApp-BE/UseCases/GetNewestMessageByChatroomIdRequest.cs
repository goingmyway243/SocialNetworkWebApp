using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.UseCases
{
    public class GetNewestMessageByChatroomIdRequest:IRequest<MessageEntity>
    {
        public Guid ChatroomId { get; set; }
    }
}
