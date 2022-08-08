using SocialNetworkWebApp.DTOs.Base;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.DTOs
{
    public class FriendshipDTO:BaseDTO<Guid>
    {
        public Guid UserId { get; set; }
        public Guid FriendId { get; set; }
        public FriendshipEntity.FriendStatus Status { get; set; }
    }
}
