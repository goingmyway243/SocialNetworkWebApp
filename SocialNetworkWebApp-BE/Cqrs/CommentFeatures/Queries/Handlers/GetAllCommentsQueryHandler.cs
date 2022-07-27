using MediatR;
using Microsoft.EntityFrameworkCore;
using SocialNetworkWebApp.Models;
using SocialNetworkWebApp.Repositories.Base;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Cqrs.CommentFeatures.Queries.Handlers
{
    public class GetAllCommentsQueryHandler : IRequestHandler<GetAllCommentsQuery, IEnumerable<CommentEntity>>
    {
        private readonly IRepository<CommentEntity> _repository;

        public GetAllCommentsQueryHandler(IRepository<CommentEntity> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CommentEntity>> Handle(GetAllCommentsQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetAll();
        }
    }
}
