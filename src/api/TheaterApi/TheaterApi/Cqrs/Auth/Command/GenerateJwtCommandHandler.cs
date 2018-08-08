using MediatR;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheaterApi.Cqrs.Auth.Command
{
    public class GenerateJwtCommandHandler : RequestHandler<GenerateJwtCommand, GenerateJwtCommand.Result>
    {
        protected override GenerateJwtCommand.Result HandleCore(GenerateJwtCommand request)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable(EnvNames.THEATERAPI_JWT_KEY)));

            var token = new JwtSecurityToken(
                issuer             : Environment.GetEnvironmentVariable(EnvNames.THEATERAPI_JWT_ISS),
                audience           : Environment.GetEnvironmentVariable(EnvNames.THEATERAPI_JWT_AUD),
                expires            : DateTime.Now.AddMinutes(30),
                signingCredentials : new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            string tokenStr = new JwtSecurityTokenHandler().WriteToken(token);

            return new GenerateJwtCommand.Result(tokenStr);
        }
    }
}
