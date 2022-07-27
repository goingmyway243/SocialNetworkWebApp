using SocialNetworkWebApp.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Models
{
    public class PostEntity : BaseEntity<Guid>
    {
        public string Caption { get; set; }
        public Guid UserId { get; set; }
        public Guid? SharePostId { get; set; }

        public UserEntity User { get; set; }
        public PostEntity SharePost { get; set; }
        public List<ContentEntity> Contents { get; set; }
        public List<CommentEntity> CommentEntities { get; set; }
        public List<ReactEntity> Reacts { get; set; }
    }
}
