using SocialNetworkWebApp.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Models
{
    public class UserEntity : BaseEntity<Guid>
    {
        public enum RoleType
        {
            User,
            Admin
        }

        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public RoleType Role { get; set; }

        public List<PostEntity> Posts { get; set; }
        public List<ChatroomEntity> Chatrooms { get; set; }
        public List<ReactEntity> Reacts { get; set; }
        public List<CommentEntity> Comments { get; set; }
        public List<MessageEntity> Messages { get; set; }

        public string GetFullName()
        {
            return FirstName + ' ' + LastName;
        }
    }
}
