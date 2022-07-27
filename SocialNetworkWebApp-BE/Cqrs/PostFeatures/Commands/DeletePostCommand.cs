using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.PostFeatures.Commands
{
    public class DeletePostCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
    }
}
