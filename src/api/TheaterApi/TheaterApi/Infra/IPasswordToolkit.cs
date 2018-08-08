using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheaterApi.Infra
{
    public interface IPasswordToolkit
    {
        byte[] EncryptPassword(string password);

        string EncryptPasswordHex(string password);

        string ToHex(byte[] password);
    }
}
