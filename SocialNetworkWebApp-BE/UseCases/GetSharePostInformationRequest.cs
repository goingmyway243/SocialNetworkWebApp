using MediatR;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.UseCases
{
    public class GetSharePostInformationRequest:IRequest<PostEntity>
    {
        public Guid SharePostId { get; set; }
    }
}
