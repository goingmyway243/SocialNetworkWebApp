using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.ContentFeatures.Queries
{
    public class GetContentByIdQuery : IRequest<ContentEntity>
    {
        public Guid Id { get; set; }
    }
}
