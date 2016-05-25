using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace TBoard.BusinessLogic.Password
{
    public class PasswordHasher
    {
        public static byte[] CreateSaltedHashedPassword(byte[] salt, string password)
        {
            return new HMACMD5(salt).ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        public static string HashPassword(string clearData, ref string saltValue, HashAlgorithm hash)
        {
            saltValue = GetSalt();

            byte[] salt = System.Text.Encoding.UTF8.GetBytes(saltValue);

            var passwordByte = CreateSaltedHashedPassword(salt, clearData);

            saltValue = System.Text.Encoding.UTF8.GetString(salt);

            return Convert.ToBase64String(passwordByte);
        }

        public static bool ValidatePassword(string password, string salt, string hash)
        {
            byte[] saltBytes = System.Text.Encoding.UTF8.GetBytes(salt);

            var newHash = new HMACMD5(saltBytes).ComputeHash(Encoding.UTF8.GetBytes(password));

            return hash == Convert.ToBase64String(newHash);
        }

        private static string GetSalt()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var result = new string(
                Enumerable.Repeat(chars, 10)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());

            return result;
        }

    }
}
