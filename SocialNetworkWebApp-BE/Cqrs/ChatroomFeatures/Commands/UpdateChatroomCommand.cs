using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Commands
{
    public class UpdateChatroomCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string ChatroomName { get; set; }
    }
}
