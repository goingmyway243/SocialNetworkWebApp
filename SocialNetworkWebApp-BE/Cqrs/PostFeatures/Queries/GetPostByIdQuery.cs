using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.PostFeatures.Queries
{
    public class GetPostByIdQuery : IRequest<PostEntity>
    {
        public Guid Id { get; set; }
    }
}
