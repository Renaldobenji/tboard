﻿using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Model;
using TBoard.Web.Attributes;
using TBoard.Web.Helpers;

namespace TBoard.Web.Controllers
{
    public class UploadController : Controller
    {        
        //
        // GET: /Upload/
        [JWTTokenValidation]
        public ActionResult Index(int key)
        {
            using (TBoardEntities entities = new TBoardEntities())
            {

                var documentReq = entities.sps_GetOutstandingDocumentRequirements(key);

                UploadViewModel view = new UploadViewModel();
                view.OrganizationID = key;
                foreach (var req in documentReq)
                {
                    view.DocumentTypes.Add(req.documentTypeID.ToString(), string.Format("{0}-{1}",req.documentCode,req.documentDescription));
                }

                return View(view);
            }
        }

        [JWTTokenValidation]
        public ActionResult DocumentTypeIndex(string documentCode, int key)
        {
            UploadViewModel view = new UploadViewModel();
            using (TBoardEntities entities = new TBoardEntities())
            {
                var documentReq = entities.documenttypes.Where(x => x.documentDescription == documentCode).FirstOrDefault();
                
                view.OrganizationID = key;
                view.DocumentTypes.Add(documentReq.documentTypeID.ToString(), string.Format("{0}-{1}", documentReq.documentCode, documentReq.documentDescription));                
            }
            return View("Index", view);
        }

        [JWTTokenValidation]
        public ActionResult DocumentTypeIndexEncrypted(string documentCode, string key)
        {
            int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(key));

            UploadViewModel view = new UploadViewModel();
            using (TBoardEntities entities = new TBoardEntities())
            {
                var documentReq = entities.documenttypes.Where(x => x.documentDescription == documentCode).FirstOrDefault();

                view.OrganizationID = orgID;
                view.DocumentTypes.Add(documentReq.documentTypeID.ToString(), string.Format("{0}-{1}", documentReq.documentCode, documentReq.documentDescription));
            }
            return View("Index", view);
        }

        [System.Web.Http.HttpPost]
        [JWTTokenValidation]
        public HttpResponseMessage PostFormCloud()
        {
            try
            {
                string storageDetails;
                using (TBoardEntities entities = new TBoardEntities())
                {
                    storageDetails = entities.configs.Where(x => x.name == "StorageConnectionString").Select(y => y.value).FirstOrDefault();
                }

                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(storageDetails);

                // Create the blob client.
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

                // Retrieve reference to a previously created container.
                CloudBlobContainer container = blobClient.GetContainerReference("tboardblogcontainer");

                var httpRequest = System.Web.HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                    foreach (string file in httpRequest.Files)
                    {
                        var guiidName = string.Format("{0}.{1}", Guid.NewGuid().ToString(), httpRequest.Files[file].FileName.Split('.')[1]);

                        // Retrieve reference to a blob named "myblob".
                        CloudBlockBlob blockBlob = container.GetBlockBlobReference(guiidName);
                        // NOTE: To store in memory use postedFile.InputStream
                        blockBlob.UploadFromStream(httpRequest.Files[file].InputStream);

                        using (TBoardEntities entities = new TBoardEntities())
                        {
                            entities.documents.Add(new document()
                            {
                                organizationID = Convert.ToInt32(httpRequest.Form["OrganizationID"]),
                                dateCreated = DateTime.Now,
                                documentTypeID = Convert.ToInt32(httpRequest.Form["DocumentType"]),
                                documentPath = guiidName
                            });
                            entities.SaveChanges();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }


        [System.Web.Http.HttpPost]
        [JWTTokenValidation]
        public HttpResponseMessage PostForm()
        {
            int expiryInMonths = 0;
            
            try
            {
                string storageDetails;
                using (TBoardEntities entities = new TBoardEntities())
                {
                    storageDetails = entities.configs.Where(x => x.name == "StorageConnectionString").Select(y => y.value).FirstOrDefault();                    
                }

                var httpRequest = System.Web.HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                    int documentTypeID = 0;
                    foreach (string file in httpRequest.Files)
                    {
                        documentTypeID = Convert.ToInt32(httpRequest.Form["DocumentType"]);
                        using (TBoardEntities entities = new TBoardEntities())
                        {
                            try
                            {
                                expiryInMonths = (int)entities.documenttypes.Where(x => x.documentTypeID == documentTypeID).First().expiryTermMonths;
                            }
                            catch (Exception)
                            {
                                expiryInMonths = 0;
                            }                            
                        }

                        var guiidName = string.Format("{0}.{1}", Guid.NewGuid().ToString(), httpRequest.Files[file].FileName.Split('.')[1]);

                        byte[] fileData = null;
                        using (var binaryReader = new BinaryReader(httpRequest.Files[file].InputStream))
                        {
                            fileData = binaryReader.ReadBytes(Request.Files[file].ContentLength);
                        }
                       
                         // Create the file.
                        using (FileStream fs = System.IO.File.Create(storageDetails+ guiidName))
                        {                            
                            // Add some information to the file.
                            fs.Write(fileData, 0, fileData.Length);
                        };

                        using (TBoardEntities entities = new TBoardEntities())
                        {
                            entities.documents.Add(new document()
                            {
                                organizationID = Convert.ToInt32(httpRequest.Form["OrganizationID"]),
                                dateCreated = DateTime.Now,
                                documentTypeID = Convert.ToInt32(httpRequest.Form["DocumentType"]),
                                documentPath = guiidName,
                                expiryDate = DateTime.Now.AddMonths(expiryInMonths)
                            });
                            entities.SaveChanges();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [System.Web.Http.HttpPost]
        [JWTTokenValidation]
        public string PostRFQForm()
        {
            int expiryInMonths = 0;
            var httpRequest = System.Web.HttpContext.Current.Request;
            var guiidlist = new List<string>();
            try
            {
                string storageDetails;
                using (TBoardEntities entities = new TBoardEntities())
                {
                    storageDetails = entities.configs.Where(x => x.name == "StorageConnectionString").Select(y => y.value).FirstOrDefault();
                }

                //Get OrganizationID from Header
                int orgID = Convert.ToInt32(EncryptionHelper.Decrypt(httpRequest.QueryString[0]));
                if (httpRequest.Files.Count > 0)
                {                   
                    foreach (string file in httpRequest.Files)
                    { 
                        var guiidName = string.Format("{0}.{1}", Guid.NewGuid().ToString(), httpRequest.Files[file].FileName.Split('.')[1]);
                        guiidlist.Add(guiidName);
                        byte[] fileData = null;
                        using (var binaryReader = new BinaryReader(httpRequest.Files[file].InputStream))
                        {
                            fileData = binaryReader.ReadBytes(Request.Files[file].ContentLength);
                        }

                        // Create the file.
                        using (FileStream fs = System.IO.File.Create(storageDetails + guiidName))
                        {
                            // Add some information to the file.
                            fs.Write(fileData, 0, fileData.Length);
                        };

                        using (TBoardEntities entities = new TBoardEntities())
                        {
                            entities.documents.Add(new document()
                            {
                                organizationID = orgID,
                                dateCreated = DateTime.Now,
                                documentTypeID = 1,
                                documentPath = guiidName,
                                expiryDate = DateTime.Now.AddMonths(expiryInMonths)
                            });
                            entities.SaveChanges();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
            return String.Join(",", guiidlist.Select(x => x.ToString()).ToArray());
        }

        public class UploadViewModel
        {
            public Dictionary<string, string> DocumentTypes { get; set; }
            public int OrganizationID { get; set; }

            public UploadViewModel()
            {
                this.DocumentTypes = new Dictionary<string, string>();
            }
        }

    }
}
