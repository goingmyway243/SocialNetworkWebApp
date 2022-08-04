using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SocialNetworkWebApp.UseCases;
using System;
using System.IO;
using System.Threading.Tasks;

namespace SocialNetworkWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewFeedsController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IMediator _mediator;

        public NewFeedsController(IWebHostEnvironment hostingEnvironment, IMediator mediator)
        {
            _hostingEnvironment = hostingEnvironment;
            _mediator = mediator;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserFeeds(Guid userId)
        {
            return Ok(await _mediator.Send(new GetAllPostsByUserIdRequest { UserId = userId }));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostWithContents(CreatePostWithContentRequest request)
        {
            var newPostId = await _mediator.Send(request);

            var file = HttpContext.Request.Form.Files[0];
            if (file!=null && file.Length > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine("", _hostingEnvironment.ContentRootPath + "/Images/" + newPostId + "/" + fileName);
                using(var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
            }



            return Ok(newPostId);
        }
    }
}
