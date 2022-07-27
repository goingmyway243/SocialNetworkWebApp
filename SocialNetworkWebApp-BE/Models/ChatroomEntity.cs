using SocialNetworkWebApp.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Models
{
    public class ChatroomEntity : BaseEntity<Guid>
    {
        public string ChatroomName { get; set; }
        public List<UserEntity> ChatMembers { get; set; }
        public List<MessageEntity> Messages { get; set; }
    }
}
