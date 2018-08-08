using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TheaterApi.Cqrs.Auth.Command;
using TheaterApi.Models;

namespace TheaterApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        public AuthController(IMediator mediator)
        {
            this.Mediator = mediator;
        }

        public IMediator Mediator { get; }

        [AllowAnonymous]
        [HttpPost("new-token")]
        public IActionResult NewToken([FromBody]AuthRequest request)
        {
            var authCmd = new AuthenticateCommand(request.Email, request.Password);
            var authResult = this.Mediator.Send(authCmd).Result;

            if (!authResult.Authenticated) return Unauthorized();

            var genTokenCmd = new GenerateJwtCommand(authResult.User);
            var genTokenResult = this.Mediator.Send(genTokenCmd).Result;

            return Ok(new NewTokenResponse() { Token = genTokenResult.Token });
        }
    }
}
