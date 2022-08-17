using MediatR;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.UseCases
{
    public class GetAllCommentsByPostIdRequest : IRequest<IEnumerable<CommentEntity>>
    {
        public Guid PostId { get; set; }
        public int Paging { get; set; }
    }
}
