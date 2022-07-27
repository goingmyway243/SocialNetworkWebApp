using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.UserFeatures.Commands
{
    public class DeleteUserCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
    }
}
