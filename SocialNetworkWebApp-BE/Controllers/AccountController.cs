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
    public class AccountController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IMediator _mediator;

        public AccountController(
            IWebHostEnvironment hostingEnvironment,
            IMediator mediator)
        {
            _hostingEnvironment = hostingEnvironment;
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpPost("{userId}")]
        public IActionResult GenerateDefaultAvatar(Guid userId)
        {
            string folderPath = Path.Combine(_hostingEnvironment.ContentRootPath, "Images");
            string filePath = Path.Combine(folderPath, "default.jpg");
            string copyPath = Path.Combine(folderPath, userId + "");

            System.IO.File.Copy(filePath, copyPath, true);

            return Ok(true);
        }
    }
}
