﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TBoard.Data.Model
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Core.Objects;
    using System.Data.Entity.Infrastructure;
    using System.Linq;

    public partial class TBoardEntities : DbContext
    {
        public TBoardEntities()
            : base("name=TBoardEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<address> addresses { get; set; }
        public DbSet<addresstype> addresstypes { get; set; }
        public DbSet<bankaccountdetail> bankaccountdetails { get; set; }
        public DbSet<bankaccounttype> bankaccounttypes { get; set; }
        public DbSet<communication> communications { get; set; }
        public DbSet<communicationtype> communicationtypes { get; set; }
        public DbSet<organization> organizations { get; set; }
        public DbSet<organizationtype> organizationtypes { get; set; }
        public DbSet<user> users { get; set; }
        public DbSet<documentrequirement> documentrequirements { get; set; }
        public DbSet<documenttype> documenttypes { get; set; }
        public DbSet<document> documents { get; set; }
        public DbSet<expertisecategory> expertisecategories { get; set; }
        public DbSet<expertisesubcategory> expertisesubcategories { get; set; }
        public DbSet<expertiseownership> expertiseownerships { get; set; }
        public DbSet<rfq> rfqs { get; set; }
        public DbSet<rfqtype> rfqtypes { get; set; }
        public DbSet<emailqueue> emailqueues { get; set; }
        public DbSet<auditentry> auditentries { get; set; }
        public DbSet<auditentrytype> auditentrytypes { get; set; }
        public DbSet<groupmembership> groupmemberships { get; set; }
        public DbSet<grouprolemapping> grouprolemappings { get; set; }
        public DbSet<group> groups { get; set; }
        public DbSet<role> roles { get; set; }
        public DbSet<quote> quotes { get; set; }
        public DbSet<rating> ratings { get; set; }
        public DbSet<config> configs { get; set; }
        public DbSet<quotestatu> quotestatus { get; set; }
    
        public virtual ObjectResult<DocumentReq> sps_GetOutstandingDocumentRequirements(Nullable<int> organizationID)
        {
            var organizationIDParameter = organizationID.HasValue ?
                new ObjectParameter("organizationID", organizationID) :
                new ObjectParameter("organizationID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<DocumentReq>("sps_GetOutstandingDocumentRequirements", organizationIDParameter);
        }
    
        public virtual ObjectResult<GetSubscribedOwnershipDetails> GetSubscribedOwnershipDetails(Nullable<int> expertiseSubCategoryID)
        {
            var expertiseSubCategoryIDParameter = expertiseSubCategoryID.HasValue ?
                new ObjectParameter("expertiseSubCategoryID", expertiseSubCategoryID) :
                new ObjectParameter("expertiseSubCategoryID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetSubscribedOwnershipDetails>("GetSubscribedOwnershipDetails", expertiseSubCategoryIDParameter);
        }
    
        public virtual ObjectResult<role> sps_GetRolesForUser(Nullable<int> userID)
        {
            var userIDParameter = userID.HasValue ?
                new ObjectParameter("userID", userID) :
                new ObjectParameter("userID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<role>("sps_GetRolesForUser", userIDParameter);
        }
    
        public virtual ObjectResult<role> sps_GetRolesForUser(Nullable<int> userID, MergeOption mergeOption)
        {
            var userIDParameter = userID.HasValue ?
                new ObjectParameter("userID", userID) :
                new ObjectParameter("userID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<role>("sps_GetRolesForUser", mergeOption, userIDParameter);
        }
    
        public virtual ObjectResult<sps_getRFQOwnerDetails_Result> sps_getRFQOwnerDetails(string rfqReference)
        {
            var rfqReferenceParameter = rfqReference != null ?
                new ObjectParameter("rfqReference", rfqReference) :
                new ObjectParameter("rfqReference", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_getRFQOwnerDetails_Result>("sps_getRFQOwnerDetails", rfqReferenceParameter);
        }
    
        public virtual ObjectResult<sps_GetBidsForQuote_Result> sps_GetBidsForQuote(string rfqReference)
        {
            var rfqReferenceParameter = rfqReference != null ?
                new ObjectParameter("rfqReference", rfqReference) :
                new ObjectParameter("rfqReference", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_GetBidsForQuote_Result>("sps_GetBidsForQuote", rfqReferenceParameter);
        }
    
        public virtual ObjectResult<sps_GetAllOrganizationInformation_Result> sps_GetAllOrganizationInformation(Nullable<int> organizationID)
        {
            var organizationIDParameter = organizationID.HasValue ?
                new ObjectParameter("organizationID", organizationID) :
                new ObjectParameter("organizationID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_GetAllOrganizationInformation_Result>("sps_GetAllOrganizationInformation", organizationIDParameter);
        }
    
        public virtual ObjectResult<sps_GetAllUserInformation_Result> sps_GetAllUserInformation(Nullable<int> userID)
        {
            var userIDParameter = userID.HasValue ?
                new ObjectParameter("userID", userID) :
                new ObjectParameter("userID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_GetAllUserInformation_Result>("sps_GetAllUserInformation", userIDParameter);
        }
    }
}
