using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Commands
{
    public class DeleteChatroomCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
    }
}
