using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.ChatroomFeatures.Commands
{
    public class CreateChatroomCommand : IRequest<Guid>
    {
        public string ChatroomName { get; set; }
    }
}
