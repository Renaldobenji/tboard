﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TBoard.Data.Model.Refactored
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class TBoardEntitiesSQL : DbContext
    {
        public TBoardEntitiesSQL()
            : base("name=TBoardEntitiesSQL")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<address> addresses { get; set; }
        public virtual DbSet<addresstype> addresstypes { get; set; }
        public virtual DbSet<auditentry> auditentries { get; set; }
        public virtual DbSet<auditentrytype> auditentrytypes { get; set; }
        public virtual DbSet<bankaccountdetail> bankaccountdetails { get; set; }
        public virtual DbSet<bankaccounttype> bankaccounttypes { get; set; }
        public virtual DbSet<communication> communications { get; set; }
        public virtual DbSet<communicationtype> communicationtypes { get; set; }
        public virtual DbSet<config> configs { get; set; }
        public virtual DbSet<custodian> custodians { get; set; }
        public virtual DbSet<documentrequirement> documentrequirements { get; set; }
        public virtual DbSet<document> documents { get; set; }
        public virtual DbSet<documenttype> documenttypes { get; set; }
        public virtual DbSet<emailqueue> emailqueues { get; set; }
        public virtual DbSet<expertisecategory> expertisecategories { get; set; }
        public virtual DbSet<expertiseownership> expertiseownerships { get; set; }
        public virtual DbSet<expertisesubcategory> expertisesubcategories { get; set; }
        public virtual DbSet<groupmembership> groupmemberships { get; set; }
        public virtual DbSet<grouprolemapping> grouprolemappings { get; set; }
        public virtual DbSet<group> groups { get; set; }
        public virtual DbSet<metadata> metadatas { get; set; }
        public virtual DbSet<organization> organizations { get; set; }
        public virtual DbSet<organizationmapping> organizationmappings { get; set; }
        public virtual DbSet<organizationtype> organizationtypes { get; set; }
        public virtual DbSet<organizationweighting> organizationweightings { get; set; }
        public virtual DbSet<quote> quotes { get; set; }
        public virtual DbSet<quotestatu> quotestatus { get; set; }
        public virtual DbSet<rating> ratings { get; set; }
        public virtual DbSet<requirement> requirements { get; set; }
        public virtual DbSet<rfq> rfqs { get; set; }
        public virtual DbSet<rfqtype> rfqtypes { get; set; }
        public virtual DbSet<role> roles { get; set; }
        public virtual DbSet<user> users { get; set; }
    
        public virtual ObjectResult<GetSubscribedOwnershipDetails_Result> GetSubscribedOwnershipDetails(Nullable<int> expertiseSubCategoryID)
        {
            var expertiseSubCategoryIDParameter = expertiseSubCategoryID.HasValue ?
                new ObjectParameter("expertiseSubCategoryID", expertiseSubCategoryID) :
                new ObjectParameter("expertiseSubCategoryID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetSubscribedOwnershipDetails_Result>("GetSubscribedOwnershipDetails", expertiseSubCategoryIDParameter);
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
    
        public virtual ObjectResult<sps_GetBidsForQuote_Result> sps_GetBidsForQuote(string rfqReference)
        {
            var rfqReferenceParameter = rfqReference != null ?
                new ObjectParameter("rfqReference", rfqReference) :
                new ObjectParameter("rfqReference", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_GetBidsForQuote_Result>("sps_GetBidsForQuote", rfqReferenceParameter);
        }
    
        public virtual ObjectResult<sps_GetHighestBidsForQuote_Result> sps_GetHighestBidsForQuote(string rfqReference)
        {
            var rfqReferenceParameter = rfqReference != null ?
                new ObjectParameter("rfqReference", rfqReference) :
                new ObjectParameter("rfqReference", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_GetHighestBidsForQuote_Result>("sps_GetHighestBidsForQuote", rfqReferenceParameter);
        }
    
        public virtual ObjectResult<sps_GetOutstandingDocumentRequirements_Result> sps_GetOutstandingDocumentRequirements(Nullable<int> organizationID)
        {
            var organizationIDParameter = organizationID.HasValue ?
                new ObjectParameter("organizationID", organizationID) :
                new ObjectParameter("organizationID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_GetOutstandingDocumentRequirements_Result>("sps_GetOutstandingDocumentRequirements", organizationIDParameter);
        }
    
        public virtual ObjectResult<sps_GetQuoteHistory_Result> sps_GetQuoteHistory(Nullable<int> userID, string qStatus, Nullable<System.DateTime> startDate, Nullable<System.DateTime> endDate)
        {
            var userIDParameter = userID.HasValue ?
                new ObjectParameter("userID", userID) :
                new ObjectParameter("userID", typeof(int));
    
            var qStatusParameter = qStatus != null ?
                new ObjectParameter("qStatus", qStatus) :
                new ObjectParameter("qStatus", typeof(string));
    
            var startDateParameter = startDate.HasValue ?
                new ObjectParameter("startDate", startDate) :
                new ObjectParameter("startDate", typeof(System.DateTime));
    
            var endDateParameter = endDate.HasValue ?
                new ObjectParameter("endDate", endDate) :
                new ObjectParameter("endDate", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_GetQuoteHistory_Result>("sps_GetQuoteHistory", userIDParameter, qStatusParameter, startDateParameter, endDateParameter);
        }
    
        public virtual ObjectResult<sps_GetQuoteOwnerDetails_Result> sps_GetQuoteOwnerDetails(Nullable<int> quoteID)
        {
            var quoteIDParameter = quoteID.HasValue ?
                new ObjectParameter("quoteID", quoteID) :
                new ObjectParameter("quoteID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_GetQuoteOwnerDetails_Result>("sps_GetQuoteOwnerDetails", quoteIDParameter);
        }
    
        public virtual ObjectResult<sps_getRFQOwnerDetails_Result> sps_getRFQOwnerDetails(string rfqReference)
        {
            var rfqReferenceParameter = rfqReference != null ?
                new ObjectParameter("rfqReference", rfqReference) :
                new ObjectParameter("rfqReference", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_getRFQOwnerDetails_Result>("sps_getRFQOwnerDetails", rfqReferenceParameter);
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
    
        public virtual ObjectResult<sps_GetSubCategories_Result> sps_GetSubCategories()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sps_GetSubCategories_Result>("sps_GetSubCategories");
        }
    }
}
