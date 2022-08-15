using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkWebApp.UseCases;
using System.Threading.Tasks;
using System;

namespace SocialNetworkWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RelationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserRelationships(Guid userId)
        {
            return Ok(await _mediator.Send(new GetAllRelationshipByUserIdRequest { UserId = userId }));
        }

        [HttpPost]
        public async Task<IActionResult> GetRelationshipBetweenUsers(GetRelationshipBetweenUsersRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
