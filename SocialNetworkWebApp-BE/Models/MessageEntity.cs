using SocialNetworkWebApp.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Models
{
    public class MessageEntity : BaseEntity<Guid>
    {
        public string Message { get; set; }
        public Guid UserId { get; set; }
        public Guid ChatroomId { get; set; }

        public UserEntity User { get; set; }
        public ChatroomEntity Chatroom { get; set; }
    }
}
