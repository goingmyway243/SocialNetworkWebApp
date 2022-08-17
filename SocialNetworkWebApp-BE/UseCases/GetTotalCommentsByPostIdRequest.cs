using MediatR;
using System;

namespace SocialNetworkWebApp.UseCases
{
    public class GetTotalCommentsByPostIdRequest :IRequest<int>
    {
        public Guid PostId { get; set; }
    }
}
