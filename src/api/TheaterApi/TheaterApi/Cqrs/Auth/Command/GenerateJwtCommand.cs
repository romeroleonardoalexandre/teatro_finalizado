using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheaterApi.Data;

namespace TheaterApi.Cqrs.Auth.Command
{
    public class GenerateJwtCommand : IRequest<GenerateJwtCommand.Result>
    {
        public class Result
        {
            public Result(string token) {
                this.Token = token;
            }

            public string Token { get; }
        }

        public GenerateJwtCommand(AppUser user) {
            this.User = user;
        }

        public AppUser User { get; }
    }
}
