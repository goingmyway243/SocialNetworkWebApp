using SocialNetworkWebApp.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Models
{
    public class FriendshipEntity : BaseEntity<Guid>
    {
        public enum FriendStatus
        {
            Request,
            Friend,
            Block
        }

        public Guid UserId { get; set; }
        public Guid FriendId { get; set; }
        public FriendStatus Status { get; set; }

        public UserEntity User { get; set; }
        public UserEntity Friend { get; set; }
    }
}
