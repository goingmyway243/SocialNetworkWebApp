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
        public async Task<IActionResult> GetReactsByPostId(Guid postId)
        {
            return Ok(await _mediator.Send(new GetAllReactsByPostIdRequest { PostId = postId }));
        }

        [HttpPost("{postId}")]
        public async Task<IActionResult> GetCommentsByPostId(Guid postId, GetAllCommentsByPostIdRequest request)
        {
            if (postId != request.PostId)
            {
                return BadRequest();
            }

            return Ok(await _mediator.Send(request));
        }
    }
}
