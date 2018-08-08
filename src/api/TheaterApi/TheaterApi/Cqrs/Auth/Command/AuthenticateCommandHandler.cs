using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TheaterApi.Data;
using TheaterApi.Infra;

namespace TheaterApi.Cqrs.Auth.Command
{
    public class AuthenticateCommandHandler : RequestHandler<AuthenticateCommand, AuthenticateCommand.Result>
    {
        public AuthenticateCommandHandler(ApplicationDBContext db, IPasswordToolkit passwordToolkit) {
            this.DB = db;
            this.PasswordToolkit = passwordToolkit;
        }

        public ApplicationDBContext DB { get; }

        public IPasswordToolkit PasswordToolkit { get; }

        protected override AuthenticateCommand.Result HandleCore(AuthenticateCommand request)
        {
            string encPassword = this.PasswordToolkit.EncryptPasswordHex(request.Password);

            var user = this.DB.AppUsers.FirstOrDefault(m => m.Email == request.Email && m.Password == encPassword);

            return new AuthenticateCommand.Result(
                authenticated : user != null,
                user          : user
            );
        }
    }
}
