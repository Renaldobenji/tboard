//------------------------------------------------------------------------------
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
    
    public partial class sps_GetAllUserInformation_Result
    {
        public int userID { get; set; }
        public Nullable<int> organizationID { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string passwordSalt { get; set; }
        public string title { get; set; }
        public string firstname { get; set; }
        public string surname { get; set; }
        public string identificationNumber { get; set; }
        public bool isApproved { get; set; }
        public string isLockedOut { get; set; }
        public Nullable<System.DateTime> lastActivityDate { get; set; }
        public Nullable<System.DateTime> lastPasswordChange { get; set; }
        public Nullable<System.DateTime> lastLoginDate { get; set; }
        public Nullable<int> failedPasswordAttemptCount { get; set; }
        public System.DateTime created { get; set; }
        public Nullable<System.DateTime> updated { get; set; }
        public string employeeCode { get; set; }
        public string departmentCode { get; set; }
        public string useruuid { get; set; }
        public Nullable<long> addressID { get; set; }
        public string owningType { get; set; }
        public string owningID { get; set; }
        public Nullable<int> addressTypeID { get; set; }
        public string addressLine1 { get; set; }
        public string addressLine2 { get; set; }
        public string addressLine3 { get; set; }
        public string addressLine4 { get; set; }
        public string addressLine5 { get; set; }
        public string postalCode { get; set; }
        public string name { get; set; }
        public string tradingName { get; set; }
        public string registrationNumber { get; set; }
        public string vatNumber { get; set; }
        public string taxNumber { get; set; }
        public Nullable<int> organizationTypeID { get; set; }
        public Nullable<bool> oem { get; set; }
        public Nullable<System.DateTime> verified { get; set; }
        public string organizationuuid { get; set; }
        public Nullable<long> bankAccountDetailID { get; set; }
        public string accountName { get; set; }
        public string accountNumber { get; set; }
        public string branchCode { get; set; }
        public string branchName { get; set; }
        public Nullable<bool> @default { get; set; }
        public Nullable<int> bankAccountTypeID { get; set; }
        public string bankName { get; set; }
        public Nullable<long> communicationID { get; set; }
        public string communicationLine1 { get; set; }
        public string communicationLine2 { get; set; }
        public Nullable<int> communicationTypeID { get; set; }
        public string role { get; set; }
    }
}
