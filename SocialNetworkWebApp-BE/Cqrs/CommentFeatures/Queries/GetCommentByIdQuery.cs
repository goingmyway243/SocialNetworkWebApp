using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.CommentFeatures.Queries
{
    public class GetCommentByIdQuery : IRequest<CommentEntity>
    {
        public Guid Id { get; set; }
    }
}
