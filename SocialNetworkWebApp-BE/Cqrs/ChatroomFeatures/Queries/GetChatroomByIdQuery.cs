using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Queries
{
    public class GetChatroomByIdQuery : IRequest<ChatroomEntity>
    {
        public Guid Id { get; set; }
    }
}
