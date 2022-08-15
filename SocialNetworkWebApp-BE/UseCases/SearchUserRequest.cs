using MediatR;
using SocialNetworkWebApp.Models;
using System;
using System.Collections.Generic;

namespace SocialNetworkWebApp.UseCases
{
    public class SearchUserRequest:IRequest<IEnumerable<UserEntity>>
    {
        public Guid UserId { get; set; }
        public string Keyword { get; set; }
    }
}
