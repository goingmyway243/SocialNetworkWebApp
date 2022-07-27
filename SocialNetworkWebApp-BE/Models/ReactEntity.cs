using SocialNetworkWebApp.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Models
{
    public class ReactEntity : BaseEntity<Guid>
    {
        public enum ReactType
        {
            Like,
            Sad,
            Haha,
            Angry
        }

        public ReactType Type { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }

        public UserEntity User { get; set; }
        public PostEntity Post { get; set; }
    }
}
