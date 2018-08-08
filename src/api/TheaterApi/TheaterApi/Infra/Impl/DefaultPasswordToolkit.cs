using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace TheaterApi.Infra.Impl
{
    public class DefaultPasswordToolkit : IPasswordToolkit
    {
        private readonly SHA256 _hashAlg;

        public DefaultPasswordToolkit() {
            _hashAlg = SHA256.Create();
        }

        public byte[] EncryptPassword(string password)
        {
            return _hashAlg.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        public string EncryptPasswordHex(string password)
        {
            byte[] pwd = this.EncryptPassword(password);
            return this.ToHex(pwd);
        }

        public string ToHex(byte[] password)
        {
            return BitConverter.ToString(password).Replace("-", string.Empty);
        }
    }
}
