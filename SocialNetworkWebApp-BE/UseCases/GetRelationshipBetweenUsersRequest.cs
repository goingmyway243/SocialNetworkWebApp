using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.UseCases
{
    public class GetRelationshipBetweenUsersRequest:IRequest<FriendshipEntity>
    {
        public Guid UserId { get; set; }
        public Guid FriendId { get; set; }    
    }
}
