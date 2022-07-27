using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.MessageFeatures.Commands
{
    public class CreateMessageCommand : IRequest<Guid>
    {
        public string Message { get; set; }
        public Guid UserId { get; set; }
        public Guid ChatroomId { get; set; }
    }
}
