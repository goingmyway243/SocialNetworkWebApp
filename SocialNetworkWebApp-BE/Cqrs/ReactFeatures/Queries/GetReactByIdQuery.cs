using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.ReactFeatures.Queries
{
    public class GetReactByIdQuery : IRequest<ReactEntity>
    {
        public Guid Id { get; set; }
    }
}
