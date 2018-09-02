using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace TBoard.Web
{
    public class QuertStringModule : System.Web.IHttpModule
    {
        static SymmetricAlgorithm mobjCryptoService;

        private const string PARAMETER_NAME = "encrypt=1&";
        private const string ENCRYPTION_KEY = "key";

        static QuertStringModule()
        {
            mobjCryptoService = new DESCryptoServiceProvider();
        }

        public void Dispose()
        {
        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += new EventHandler(context_BeginRequest);
            context.EndRequest += new EventHandler(context_EndRequest);
        }

        void context_EndRequest(object sender, EventArgs e)
        {
            if (HttpContext.Current.Response.IsRequestBeingRedirected)
            {
                HttpContext.Current.Response.RedirectLocation = Encrypt(HttpContext.Current.Response.RedirectLocation);
            }
            else
            {
            }
        }

        void context_BeginRequest(object sender, EventArgs e)
        {
            HttpContext context = HttpContext.Current;
            if (context.Request.Url.OriginalString.Contains("aspx") &&
                       context.Request.RawUrl.Contains("?"))
            {
                string query = context.Request.RawUrl;
                string path = HttpContext.Current.Request.Url.ToString();

                if (query.Contains(PARAMETER_NAME))
                {
                    // Decrypts the query string and rewrites the path.  
                    //string rawQuery = query.Replace(PARAMETER_NAME, string.Empty);  
                    string decryptedQuery = Decrypt(query);
                    context.RewritePath(path, string.Empty, decryptedQuery);
                }
                else if (context.Request.HttpMethod == "GET")
                {
                    // Encrypt the query string and redirects to the encrypted URL.  
                    // Remove if you don't want all query strings to be encrypted automatically.  
                    if (query != "")
                    {
                        string encryptedQuery = Encrypt(query);
                        context.Response.Redirect(encryptedQuery);
                    }
                }
            }
        }



        public static string Encrypt(string url)
        {
            string cookedUrl = url;

            if (url != null && url.Contains("?"))
            {
                cookedUrl = url.Substring(0, url.IndexOf('?') + 1);

                var queryStrings = url.Substring(url.IndexOf('?') + 1).Split('&');

                foreach (var queryString in queryStrings)
                {
                    if (!string.IsNullOrEmpty(queryString))
                        cookedUrl += queryString.Split('=')[0] + "=" + Encrypting(queryString.Split('=')[1], ENCRYPTION_KEY) + "&";
                }
                cookedUrl = cookedUrl.Substring(0, cookedUrl.Length - 1);
                cookedUrl = cookedUrl.Replace("?", "?" + PARAMETER_NAME);
            }
            return cookedUrl;
        }

        public static string Decrypt(string url)
        {
            if (url.Contains("?"))
            {
                var path = HttpContext.Current.Request.RawUrl;
                path = path.Substring(0, path.IndexOf("?", StringComparison.Ordinal) + 1);
                path = path.Substring(path.LastIndexOf("/", StringComparison.Ordinal) + 1);

                var queryStrings = url.Substring(url.IndexOf('?') + 1).Split('&');

                foreach (var queryString in queryStrings)
                {
                    path += queryString.Split('=')[0] + "=" + Decrypting(queryString.Substring(queryString.IndexOf('=') + 1), ENCRYPTION_KEY) + "&";
                }
                path = path.Substring(0, path.Length - 1);
                url = path;
            }
            return url;
        }

        static string Encrypting(string Source, string Key)
        {
            byte[] bytIn = System.Text.ASCIIEncoding.ASCII.GetBytes(Source);
            System.IO.MemoryStream ms = new System.IO.MemoryStream();

            byte[] bytKey = GetLegalKey(Key);

            mobjCryptoService.Key = bytKey;
            mobjCryptoService.IV = bytKey;

            ICryptoTransform encrypto = mobjCryptoService.CreateEncryptor();

            CryptoStream cs = new CryptoStream(ms, encrypto, CryptoStreamMode.Write);

            cs.Write(bytIn, 0, bytIn.Length);
            cs.FlushFinalBlock();

            byte[] bytOut = ms.GetBuffer();
            int i = 0;
            for (i = 0; i < bytOut.Length; i++)
                if (bytOut[i] == 0)
                    break;

            return System.Convert.ToBase64String(bytOut, 0, i);
        }

        static string Decrypting(string Source, string Key)
        {
            byte[] bytIn = System.Convert.FromBase64String(Source);

            System.IO.MemoryStream ms = new System.IO.MemoryStream(bytIn, 0, bytIn.Length);
            ms.Position = 0;

            byte[] bytKey = GetLegalKey(Key);

            mobjCryptoService.Key = bytKey;
            mobjCryptoService.IV = bytKey;

            ICryptoTransform encrypto = mobjCryptoService.CreateDecryptor();

            CryptoStream cs = new CryptoStream(ms, encrypto, CryptoStreamMode.Read);

            System.IO.StreamReader sr = new System.IO.StreamReader(cs);
            return sr.ReadToEnd();
        }

        static byte[] GetLegalKey(string Key)
        {
            string sTemp;
            if (mobjCryptoService.LegalKeySizes.Length > 0)
            {
                int lessSize = 0, moreSize = mobjCryptoService.LegalKeySizes[0].MinSize;

                while (Key.Length * 8 > moreSize)
                {
                    lessSize = moreSize;
                    moreSize += mobjCryptoService.LegalKeySizes[0].SkipSize;
                }
                sTemp = Key.PadRight(moreSize / 8, ' ');
            }
            else
                sTemp = Key;


            return ASCIIEncoding.ASCII.GetBytes(sTemp);
        }

    }
}