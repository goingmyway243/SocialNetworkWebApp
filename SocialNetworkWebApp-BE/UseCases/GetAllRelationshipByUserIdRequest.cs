using MediatR;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.UseCases
{
    public class GetAllRelationshipByUserIdRequest : IRequest<IEnumerable<FriendshipEntity>>
    {
        public Guid UserId { get; set; }
    }
}
