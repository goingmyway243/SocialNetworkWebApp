using MediatR;
using System;

namespace SocialNetworkWebApp.Cqrs.PostFeatures.Commands
{
    public class UpdatePostCommand : IRequest<Guid>
    {
        public Guid Id { get; set; }
        public string Caption { get; set; }
    }
}
