using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheaterApi.Data;

namespace TheaterApi.Cqrs.Auth.Command
{
    public class AuthenticateCommand : IRequest<AuthenticateCommand.Result>
    {
        public class Result
        {
            public Result(bool authenticated, AppUser user) {
                this.Authenticated = authenticated;
                this.User = user;
            }

            public bool Authenticated { get; }

            public AppUser User { get; }
        }

        public AuthenticateCommand(string email, string password) {
            this.Email = email;
            this.Password = password;
        }

        public string Email { get; }
        public string Password { get; }
    }
}
