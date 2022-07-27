using SocialNetworkWebApp.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Models
{
    public class CommentEntity : BaseEntity<Guid>
    {
        public string Comment { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }

        public UserEntity User { get; set; }
        public PostEntity Post { get; set; }
    }
}
