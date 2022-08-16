using MediatR;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkWebApp.UseCases;
using System;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsFeedController : ControllerBase
    {
        private readonly IMediator _mediator;

        public NewsFeedController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> GetUserFeeds(GetAllPostsByUserIdRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetUserFeeds(Guid postId)
        {
            return Ok(await _mediator.Send(new GetAllReactsByPostIdRequest { PostId = postId }));
        }
    }
}
