using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.MessageFeatures.Commands
{
    public class UpdateMessageCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
    }
}
