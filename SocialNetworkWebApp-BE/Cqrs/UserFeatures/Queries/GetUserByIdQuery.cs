using MediatR;
using SocialNetworkWebApp.Models;
using System;

namespace SocialNetworkWebApp.Cqrs.UserFeatures.Queries
{
    public class GetUserByIdQuery : IRequest<UserEntity>
    {
        public Guid Id { get; set; }
    }
}
