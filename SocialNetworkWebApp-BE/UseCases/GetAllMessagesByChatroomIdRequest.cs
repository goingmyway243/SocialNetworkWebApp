using MediatR;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.UseCases
{
    public class GetAllMessagesByChatroomIdRequest:IRequest<IEnumerable<MessageEntity>>
    {
        public Guid ChatroomId { get; set; }
        public bool GetLatest{ get; set; }
    }
}
