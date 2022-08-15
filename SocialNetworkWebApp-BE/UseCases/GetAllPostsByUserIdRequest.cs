using MediatR;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.UseCases
{
    public class GetAllPostsByUserIdRequest : IRequest<IEnumerable<PostEntity>>
    {
        public Guid UserId { get; set; }
        public bool PostedByUserOnly { get; set; }
    }
}
