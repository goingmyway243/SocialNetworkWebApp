using MediatR;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.UseCases
{
    public class GetAllReactsByPostIdRequest:IRequest<IEnumerable<ReactEntity>>
    {
        public Guid PostId { get; set; }
    }
}
