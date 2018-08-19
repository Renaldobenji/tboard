﻿var Organization = React.createClass({
    getInitialState: function() {
        return {
            Name: '',
            TradingName: '',
            RegistrationNumber: '',
            VatNumber: '',
            TaxNumber: '',
            OrganizationID: '',
            CellNumber : '',
			HomeNumber : '',
			OfficeNumber : '',
			Email: '',
			ContactRole: '',
			AddressLine1 : '',
			AddressLine2 : '',
			AddressLine3 : '',
			AddressLine4 : '',
			AddressLine5 : '',
			PostalCode : '',
            AddressID : '',
            OwnerType : 'ORG',
            AccountName: '',
            AccountNumber : '',
            BranchCode : '',
            BranchName : '',
            BankAccountType: [],
            ContactDirectory: [],           
            UserOrg: [],
            SelectedBankAccountType : '',
            OEM: 'false',
            UserID: '',
            bankDetailsList: [],
            CreateOrgName: '',
            CreateOrgTradingName: '',
            CreateOrgRegistrationNumber: '',
            CreateOrgVatNumber: '',
            CreateOrgTaxNumber: '',
            CreateOrgOEM: 'false',
        };
    },

    componentWillMount: function () {       
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ OrganizationID: decodedToken.OrganizationID });
        this.setState({ UserID: decodedToken.UserID });
    },

    fetchOrgDetails: function(orgID) {
        $.ajax({
          url: 'api/organization/' + orgID,
          dataType: 'json',
          cache: false,
          success: function(data) {
              var obj = $.parseJSON(data);
              if (obj.name != null)
                this.setState({Name : obj.name});
              if (obj.tradingName != null)
                this.setState({TradingName : obj.tradingName});
              if (obj.registrationNumber != null)
                this.setState({RegistrationNumber : obj.registrationNumber});
              if (obj.vatNumber != null)
                this.setState({VatNumber : obj.vatNumber});
              if (obj.taxNumber != null)
                this.setState({TaxNumber : obj.taxNumber});
              if (obj.organizationID != null)
                this.setState({OrganizationID : obj.organizationID});
			  if (obj.oem != null)
                this.setState({OEM : obj.oem});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('api/organization', status, err.toString());
          }.bind(this)
        });
    },

    fetchAddressDetails: function(orgID) {
        $.ajax({
          url: 'api/Address/ORG/' + orgID,
          dataType: 'json',
          cache: false,
          success: function (data) {

              if (data == "null")
              {
                  this.setState({ AddressLine1: "" });
                  this.setState({ AddressLine2: "" });
                  this.setState({ AddressLine3: "" });
                  this.setState({ AddressLine4: "" });
                  this.setState({ AddressLine5: "" });
                  this.setState({ PostalCode: "" });
                  this.setState({ AddressID: "" });
                  return;
              }

              var obj = $.parseJSON(data);
              if (obj.addressLine1 != null)
                  this.setState({ AddressLine1: obj.addressLine1 });
              else
                  this.setState({ AddressLine1: "" });
              
              if (obj.addressLine2 != null)
                  this.setState({ AddressLine2: obj.addressLine2 });
              else
                  this.setState({ AddressLine2: "" });
              
              if (obj.addressLine3 != null)
                  this.setState({ AddressLine3: obj.addressLine3 });
              else
                  this.setState({ AddressLine3: "" });
              
              if (obj.addressLine4 != null)
                  this.setState({ AddressLine4: obj.addressLine4 });
              else
                  this.setState({ AddressLine4: "" });
              
              if (obj.addressLine5 != null)
                  this.setState({ AddressLine5: obj.addressLine5 });
              else
                  this.setState({ AddressLine5: "" });
              
              if (obj.postalCode != null)
                  this.setState({ PostalCode: obj.postalCode });
              else
                  this.setState({ PostalCode: "" });

             if (obj.addressID != null)
                 this.setState({ AddressID: obj.addressID });
             else
                 this.setState({ AddressID: "" });

          }.bind(this),
          error: function(xhr, status, err) {
            console.error('api/Address/ORG/', status, err.toString());
          }.bind(this)
        });
    },

    fetchContactDetailsArray: function (orgID) {
        $.ajax({
            url: 'api/Communication/ORG/' + orgID,
            dataType: 'json',
            cache: false,
            success: function (data) {
                var obj = $.parseJSON(data);                
                this.setState({ ContactDirectory: obj });           

            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Address/ORG/', status, err.toString());
            }.bind(this)
        });
    },    

    fetchContactDetails: function(orgID) {
        $.ajax({
          url: 'api/Communication/ORG/' + orgID,
          dataType: 'json',
          cache: false,
          success: function(data) {
              var obj = $.parseJSON(data);
              
               if (obj.Home != null)
                   this.setState({ HomeNumber: obj.Home });
              else
                   this.setState({ HomeNumber: "" });
              
              if (obj.CellPhone != null)
                  this.setState({ CellNumber: obj.CellPhone });
              else
                  this.setState({ CellNumber: "" });
              
              if (obj.WorkPhone != null)
                  this.setState({ OfficeNumber: obj.WorkPhone });
              else
                  this.setState({ OfficeNumber: "" });
              
              if (obj.Email != null)
                  this.setState({ Email: obj.Email });
              else
                  this.setState({ Email: "" });

          }.bind(this),
          error: function(xhr, status, err) {
            console.error('api/Address/ORG/', status, err.toString());
          }.bind(this)
        });
    },

    fetchBankDetails: function(orgID) {
        $.ajax({
          url: 'api/BankAccount/ORG/' + orgID,
          dataType: 'json',
          cache: false,
          success: function(data) {
              this.setState({ bankDetailsList: data.data });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('api/BankAccount/ORG', status, err.toString());
          }.bind(this)
        });
    },

    fetchAccountTypes: function() {
        $.ajax({
          url: 'api/BankAccount/BankAccountTypes/',
          dataType: 'json',
          cache: false,
          success: function(data) {
              this.setState({ BankAccountType: data.data });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('api/Address/ORG/', status, err.toString());
          }.bind(this)
        });
    },

    fetchUserOrganization: function (userID) {
        $.ajax({
            url: 'api/Organization/GetUserOrganizations/' + userID,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ UserOrg: data.data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Organization/GetUserOrganizations/', status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function () {
       
        this.fetchOrgDetails(this.state.OrganizationID);
        this.fetchAddressDetails(this.state.OrganizationID);
        this.fetchContactDetailsArray(this.state.OrganizationID);        
        this.fetchAccountTypes();
        this.fetchBankDetails(this.state.OrganizationID);
        this.fetchUserOrganization(this.state.UserID);
    },
    
    registerUserPOST : function() {
        console.log('POSTING FORM');
        $.ajax({
                  url: 'api/Organization/Post',
                  type: 'POST',
                  dataType: 'json',
                  data: this.state,
                  cache: false,
                  success: function(data) {
                      var opts = {
                          title: "Success",
                          text: "That thing that you were trying to do worked.",
                          addclass: "stack-bottomright",
                          type: "success",
                          nonblock: {
                              nonblock: true
                          }
                      };
                      new PNotify(opts);
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error('api/Organization/Post', status, err.toString());
                  }.bind(this)
            });
    },

    addressPOST : function() {
        console.log('POSTING FORM');
        $.ajax({
                  url: 'api/Address/Post',
                  type: 'POST',
                  dataType: 'json',
                  data: this.state,
                  cache: false,
                  success: function(data) {
                      var opts = {
                          title: "Success",
                          text: "That thing that you were trying to do worked.",
                          addclass: "stack-bottomright",
                          type: "success",
                          nonblock: {
                              nonblock: true
                          }
                      };
                      new PNotify(opts);
                      
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error('api/Organization/Post', status, err.toString());
                  }.bind(this)
            });
    },

    contactPOST : function() {
        console.log('POSTING FORM');
        $.ajax({
                  url: 'api/Communication/PostOrganization',
                  type: 'POST',
                  dataType: 'json',
                  data: this.state,
                  cache: false,
                  success: function (data) {
                      this.fetchContactDetailsArray(this.state.OrganizationID);
                      var opts = {
                          title: "Success",
                          text: "That thing that you were trying to do worked.",
                          addclass: "stack-bottomright",
                          type: "success",
                          nonblock: {
                              nonblock: true
                          }
                      };                      
                      new PNotify(opts);
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error('api/Organization/Post', status, err.toString());
                  }.bind(this)
        });
        
    },

    bankDetailsPOST : function() {
        console.log('POSTING FORM');
        $.ajax({
                  url: 'api/BankAccount/Post',
                  type: 'POST',
                  dataType: 'json',
                  data: this.state,
                  cache: false,
                  success: function (data) {
                      this.fetchBankDetails(this.state.OrganizationID);
                      var opts = {
                          title: "Success",
                          text: "That thing that you were trying to do worked.",
                          addclass: "stack-bottomright",
                          type: "success",
                          nonblock: {
                              nonblock: true
                          }
                      };
                      new PNotify(opts);
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error('api/BankAccount/Post', status, err.toString());
                  }.bind(this)
            });
    },

    updateBankAccountType : function(e){
        this.setState({SelectedBankAccountType : e.target.value});		
    },
    updateName : function(e){
    this.setState({Name : e.target.value});		
    },
    updateTradingName : function(e){
    this.setState({TradingName : e.target.value});		
    },
    updateRegistrationNumber : function(e){
    this.setState({RegistrationNumber : e.target.value});		
    },
    updateVatNumber : function(e){
    this.setState({VatNumber : e.target.value});		
    },
    updateTaxNumber : function(e){
    this.setState({TaxNumber : e.target.value});		
    },
	updateAddLine1 : function(e){
		this.setState({AddressLine1 : e.target.value});		
	},
	updateAddLine2 : function(e){
		this.setState({AddressLine2 : e.target.value});		
	},
	updateAddLine3 : function(e){
		this.setState({AddressLine3 : e.target.value});	
		console.log(this.state.AddressLine3);		
	},
	updateAddLine4 : function(e){
		this.setState({AddressLine4 : e.target.value});		
	},
	updateAddLine5 : function(e){
		this.setState({AddressLine5 : e.target.value});	
		console.log(this.state.AddressLine5);		
	},
	updatePostalCode : function(e){
		this.setState({PostalCode : e.target.value});	
		console.log(this.state.PostalCode);		
	},updateCellNumberState : function(e){
		this.setState({CellNumber : e.target.value});	
		console.log(this.state.CellNumber);			
	},
	updateHomeNumberState : function(e){
		this.setState({HomeNumber : e.target.value});		
	},
	updateOfficeNumberState : function(e){
		this.setState({OfficeNumber : e.target.value});		
	},
	updateEmailState : function(e){
		this.setState({Email : e.target.value});
		console.log(this.state.Email);		
	},
    updateAccountName : function(e){
		this.setState({AccountName : e.target.value});
		console.log(this.state.AccountName);		
	},
    updateAccountNumber : function(e){
		this.setState({AccountNumber : e.target.value});
		console.log(this.state.AccountNumber);		
	},
    updateBranchCode : function(e){
		this.setState({BranchCode : e.target.value});
		console.log(this.state.BranchCode);		
	},
    updateBranchName : function(e){
		this.setState({BranchName : e.target.value});
		console.log(this.state.BranchName);		
	},
	updateOEM : function(e){
		this.setState({OEM : e.target.value});
		console.log(this.state.OEM);		
	},
	updatecontactRole: function (e) {
	    this.setState({ ContactRole: e.target.value });
	    console.log(this.state.ContactRole);
	},

	updateOrganizationID: function (e) {	    

	    var filtered = this.state.UserOrg.filter(function (el) {
	        return el.Name === e.target.value;
	    });

	    var orgKey = filtered[0].Key;
	    this.setState({ OrganizationID: orgKey });
	    console.log(this.state.OrganizationID);

	    this.fetchOrgDetails(orgKey);
	    this.fetchAddressDetails(orgKey);
	    this.fetchContactDetails(orgKey);	    
	    this.fetchBankDetails(orgKey);
	},

	render: function() {
        var navBarSyle= {
              marginBottom:0
        };

        let optionItems = this.state.UserOrg.map((planet) =>
            <option key={planet.Key }>{planet.Name}</option>
            );

		return (	
                <div>		
				    <nav className="navbar navbar-default navbar-static-top" role="navigation" style={navBarSyle}>
	                    <NavHeader />
                        <NavMenu />
                    </nav>
                    <div id="page-wrapper">
	                    <div className="row">
		                    <div className="col-lg-12">
			                    <h1 className="page-header">Organization Details</h1>
		                    </div>                
	                    </div>

                        <div className="row">	
                            <form>	                   
                            <div className="form-group">
                                    <label>Organization</label>
                                   <select className="form-control" onChange={this.updateOrganizationID}>
                                       {optionItems}                                       
                                   </select> 
                            </div>	
                            </form>
                        </div>

                        <div className="row"> 
                            <ul className="nav nav-tabs">
		                        <li className="active"><a href="#Details" data-toggle="tab" aria-expanded="true">Details</a>
		                        </li>
		                        <li className=""><a href="#Contact" data-toggle="tab" aria-expanded="false">Contact Directory</a>
		                        </li>
		                        <li className=""><a href="#Address" data-toggle="tab" aria-expanded="false">Address</a>
		                        </li>
                                <li className=""><a href="#BankDetails" data-toggle="tab" aria-expanded="false">Bank Details</a>
		                        </li>
                                <li className="">
                                <a href="#Custodian" data-toggle="tab" aria-expanded="false">Administrator</a>
                                </li>                                
                                <li className=""><a href="#Expertise" data-toggle="tab" aria-expanded="false">Commodities and Services</a>
		                        </li>
	                        </ul>	
	                        <div className="tab-content">
		                        <div className="tab-pane fade active in" id="Details">
			                        <div className="col-lg-8">
                                        <br/>
                                        <OrganizationDetails OEM={this.state.OEM} updateOEM={this.updateOEM} Name={this.state.Name} TradingName={this.state.TradingName} RegistrationNumber={this.state.RegistrationNumber} VatNumber={this.state.VatNumber} TaxNumber={this.state.TaxNumber}
                                                      updateName={this.updateName}  updateTradingName={this.updateTradingName} updateRegistrationNumber={this.updateRegistrationNumber} updateVatNumber={this.updateVatNumber} updateTaxNumber={this.updateTaxNumber} registerUserPOST= {this.registerUserPOST} />
                                    </div>
		                        </div>
		                        <div className="tab-pane fade" id="Contact">
			                        <div className="col-lg-6">
                                        <br/>
                                        <OrganizationContact 
                                                            cellNumber={this.state.CellNumber} updateCellNumber={this.updateCellNumberState} contactRole={this.state.ContactRole} updatecontactRole={this.updatecontactRole}
											                homeNumber={this.state.HomeNumber} updateHomeNumber={this.updateHomeNumberState}
											                officeNumber={this.state.OfficeNumber} updateOfficeNumber={this.updateOfficeNumberState}
											                email={this.state.Email} updateEmail={this.updateEmailState} contactPOST= {this.contactPOST} />
                                    </div>
                                    <div className="col-lg-6">
                                        <br />
                                        <ContactDirectoryList ContactDirectory={this.state.ContactDirectory} />                                        
                                    </div>
		                        </div>
		                        <div className="tab-pane fade" id="Address">
			                        <div className="col-lg-8">
                                        <br/>
                                        <OrganizationAddress addressLine1={this.state.AddressLine1} updateAddressLine1={this.updateAddLine1}
										                  addressLine2={this.state.AddressLine2} updateAddressLine2={this.updateAddLine2}
										                  addressLine3={this.state.AddressLine3} updateAddressLine3={this.updateAddLine3}
										                  addressLine4={this.state.AddressLine4} updateAddressLine4={this.updateAddLine4}
										                  addressLine5={this.state.AddressLine5} updateAddressLine5={this.updateAddLine5}
										                  postalCode={this.state.PostalCode} updatePostalCode={this.updatePostalCode} addressPOST= {this.addressPOST} />
                                    </div>
		                        </div>
                                <div className="tab-pane fade" id="BankDetails">
			                        <div className="col-lg-6">
                                        <br/>
                                        <OrganizationBankDetails accountName={this.state.AccountName} updateAccountName={this.updateAccountName}
										                  accountNumber={this.state.AccountNumber} updateAccountNumber={this.updateAccountNumber}
										                  branchCode={this.state.BranchCode} updateBranchCode={this.updateBranchCode}
										                  branchName={this.state.BranchName} updateBranchName={this.updateBranchName}
										                  accountType={this.state.AccountType} updateAccountType={this.updateAccountType}
										                  bankDetailsPOST= {this.bankDetailsPOST} bankAccountTypes= {this.state.BankAccountType} updateBankAccountType= {this.updateBankAccountType} selectedBankAccountType= {this.state.SelectedBankAccountType} />
                                    </div>
                                    <div className="col-lg-6">
                                        <br />                                        
                                        <OrganizationBankDetailsList bankDetailsList={this.state.bankDetailsList} BankAccountType={this.state.BankAccountType}/>
                                    </div>
		                        </div>
                                
                                <div className="tab-pane fade" id="Custodian">
			                        <div className="col-lg-8">
                                        <br />
                                        <CustodianDetails OrganizationID={this.state.OrganizationID} />
			                        </div>                                   
                                </div>
                                <div className="tab-pane fade" id="Expertise">
			                        <div className="col-lg-8">
                                        <br/>
                                        <OrganizationExpertise OrganizationID={this.state.OrganizationID}/>                                       
                                    </div>
                                    <div className="col-lg-4">
                                        <br />
                                        <UserExpertiseAdd />
                                    </div>                                    
		                        </div>
	                        </div>
                            
                        </div>
                    </div>
                </div>       
            )
	}
});



/*Register Page*/
var OrganizationDetails = React.createClass({	
	render: function(){
		return (    
		        <div className="panel panel-default">
			        <div className="panel-heading">
				        Details
			        </div>
			        <div className="panel-body">
				        <form>
						    <div className="form-group">
                                <label>Name</label>
                                <input id="Name" className="form-control" placeholder="Name" value={this.props.Name} onChange={this.props.updateName} />
                            </div>
						    <div className="form-group">
                                <label>Trading Name</label>
                                <input id="TradingName" className="form-control" placeholder="Trading Name" value={this.props.TradingName} onChange={this.props.updateTradingName}/>
                            </div>
						    <div className="form-group">
                                <label>Registration Number</label>
                                <input id="RegistrationNumber" className="form-control" placeholder="Registration Number" value={this.props.RegistrationNumber}  onChange={this.props.updateRegistrationNumber}/>
                            </div>
						    <div className="form-group">
                                <label>Vat Number</label>
                                <input id="VatNumber" className="form-control" placeholder="Vat Number" value={this.props.VatNumber} onChange={this.props.updateVatNumber}/>
                            </div>
						    <div className="form-group">
                                <label>Tax Number</label>
                                <input id="TaxNumber" className="form-control" placeholder="Tax Number" value={this.props.TaxNumber} onChange={this.props.updateTaxNumber}/>
                            </div>
							<div className="form-group">
                                <label>OEM</label>
                                <select className="form-control" value={this.props.OEM} onChange={this.props.updateOEM}>
                                    <option value='false'>False</option>
									<option value='true'>True</option>
                                </select>
                            </div>
					    </form>
			        </div> 
                    <div className="panel-footer text-right">
                        <button type="button" className="btn btn-primary" onClick={this.props.registerUserPOST} >Save</button>
                    </div>
		        </div>
		);
	}
});


/*Register Page*/
var CreateOrganization = React.createClass({

    getInitialState: function () {
        return {
            Name: '',
            TradingName: '',
            RegistrationNumber: '',
            VatNumber: '',
            TaxNumber: '',
            OrganizationID: '',
            CellNumber: '',
            HomeNumber: '',
            OfficeNumber: '',
            Email: '',
            contactRole : '',
            AddressLine1: '',
            AddressLine2: '',
            AddressLine3: '',
            AddressLine4: '',
            AddressLine5: '',
            PostalCode: '',
            AddressID: '',
            OwnerType: 'ORG',
            AccountName: '',
            AccountNumber: '',
            BranchCode: '',
            BranchName: '',
            BankAccountType: [],
            SelectedBankAccountType: '',
            OEM: 'false',
            UserID: '',
            bankDetailsList: [],            
        };
    },

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();        
        this.setState({ UserID: decodedToken.UserID });
    },    
   
    CreateOrgPOST: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Organization/Create',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function (data) {
                var opts = {
                    title: "Success",
                    text: "That thing that you were trying to do worked.",
                    addclass: "stack-bottomright",
                    type: "success",
                    nonblock: {
                        nonblock: true
                    }
                };
                new PNotify(opts);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Organization/Post', status, err.toString());
            }.bind(this)
        });
    },
   
    updateName: function (e) {
        this.setState({ Name: e.target.value });
    },
    updateTradingName: function (e) {
        this.setState({ TradingName: e.target.value });
    },
    updateRegistrationNumber: function (e) {
        this.setState({ RegistrationNumber: e.target.value });
    },
    updateVatNumber: function (e) {
        this.setState({ VatNumber: e.target.value });
    },
    updateTaxNumber: function (e) {
        this.setState({ TaxNumber: e.target.value });
    },
    updateOEM: function (e) {
        this.setState({ OEM: e.target.value });
        console.log(this.state.OEM);
    },

    render: function () {
        var navBarSyle = {
            marginBottom: 0
        };


        return (

                              <div>
	<nav className="navbar navbar-default navbar-static-top" role="navigation" style={navBarSyle}>
		<NavHeader />
		<NavMenu />
	</nav>
	<div id="page-wrapper">
        <div className="row">
		                    <div className="col-lg-12">
			                    <h1 className="page-header">Create Organization</h1>
		                    </div>
        </div>
                        <div className="row">
		<div className="panel panel-default">
			<div className="panel-heading">
			    Create Organization
			</div>
			<div className="panel-body">
				<form>
					<div className="form-group">
						<label>Name</label>
						<input id="Name" className="form-control" placeholder="Name" value={this.state.Name} onChange={this.updateName} />
					</div>
					<div className="form-group">
						<label>Trading Name</label>
						<input id="TradingName" className="form-control" placeholder="Trading Name" value={this.state.TradingName} onChange={this.updateTradingName} />
					</div>
					<div className="form-group">
						<label>Registration Number</label>
						<input id="RegistrationNumber" className="form-control" placeholder="Registration Number" value={this.state.RegistrationNumber} onChange={this.updateRegistrationNumber} />
					</div>
					<div className="form-group">
						<label>Vat Number</label>
						<input id="VatNumber" className="form-control" placeholder="Vat Number" value={this.state.VatNumber} onChange={this.updateVatNumber} />
					</div>
					<div className="form-group">
						<label>Tax Number</label>
						<input id="TaxNumber" className="form-control" placeholder="Tax Number" value={this.state.TaxNumber} onChange={this.updateTaxNumber} />
					</div>
					<div className="form-group">
						<label>OEM</label>
						<select className="form-control" value={this.state.OEM} onChange={this.updateOEM}>
							<option value='false'>False</option>
							<option value='true'>True</option>
						</select>
					</div>
				</form>
			</div>
			<div className="panel-footer text-right">
				<button type="button" className="btn btn-primary" onClick={this.CreateOrgPOST}>Create</button>
			</div>
		</div>
                            </div>

                        </div>
               </div>  
		);
    }
});


/*Register Page*/
var OrganizationAddress = React.createClass({	
	render: function(){
		return (	
		        <div className="panel panel-default">
			        <div className="panel-heading">
				        Address Information
			        </div>
			        <div className="panel-body">
				        <form>
						    <div className="form-group">
                                <label>Address Line 1</label>
                                <input id="AddressLine1" className="form-control" placeholder="Address Line 1" value={this.props.addressLine1} onChange={this.props.updateAddressLine1}/>
                            </div>
						    <div className="form-group">
                                <label>Address Line 2</label>
                                <input id="AddressLine2" className="form-control" placeholder="Address Line 2" value={this.props.addressLine2} onChange={this.props.updateAddressLine2}/>
                            </div>
						    <div className="form-group">
                                <label>Address Line 3</label>
                                <input id="AddressLine3" className="form-control" placeholder="Address Line 3" value={this.props.addressLine3} onChange={this.props.updateAddressLine3}/>
                            </div>
						    <div className="form-group">
                                <label>Address Line 4</label>
                                <input id="AddressLine4" className="form-control" placeholder="Address Line 4" value={this.props.addressLine4} onChange={this.props.updateAddressLine4}/>
                            </div>
						    <div className="form-group">
                                <label>Address Line 5</label>
                                <input id="AddressLine5" className="form-control" placeholder="Address Line 5" value={this.props.addressLine5} onChange={this.props.updateAddressLine5}/>
                            </div>
						    <div className="form-group">
                                <label>Postal Code</label>
                                <input id="PostalCode" className="form-control" placeholder="Postal Code" value={this.props.postalCode} onChange={this.props.updatePostalCode}/>
                            </div>
					    </form>
			        </div> 
                    <div className="panel-footer text-right">
                        <button type="button" className="btn btn-primary" onClick={this.props.addressPOST} >Save</button>
                    </div>
		        </div>
		);
	}
});


/*Register Page*/
var OrganizationContact = React.createClass({	
	render: function(){
		return (	
		            <div className="panel panel-default">
			            <div className="panel-heading">
				            Contact Directory
			            </div>
			            <div className="panel-body">
				            <form>
						        <div className="form-group">
                                    <label>Cell Number</label>
                                    <input id="CellNumber" className="form-control" placeholder="Cell Number" value={this.props.cellNumber} onChange={this.props.updateCellNumber}/>
                                </div>
						        <div className="form-group">
                                    <label>Home Number</label>
                                    <input id="HomeNumber" className="form-control" placeholder="Home Number" value={this.props.homeNumber} onChange={this.props.updateHomeNumber}/>
                                </div>
						        <div className="form-group">
                                    <label>Office Number</label>
                                    <input id="WorkNumber" className="form-control" placeholder="Work Number" value={this.props.officeNumber} onChange={this.props.updateOfficeNumber}/>
                                </div>
						        <div className="form-group">
                                    <label>Email</label>
                                    <input id="Email" className="form-control" placeholder="Email" value={this.props.email} onChange={this.props.updateEmail}/>
                                </div>
                                <div className="form-group">
                                <label>Role</label>
                                <select className="form-control" value={this.props.contactRole} onChange={this.props.updatecontactRole}>
                                    <option value='Manager'>Manager</option>
									<option value='Administrator'>Administrator</option>
                                    <option value='Reception'>Reception</option>
                                </select>
                            </div>						
					        </form>
			            </div> 
                        <div className="panel-footer text-right">
                            <button type="button" className="btn btn-primary" onClick={this.props.contactPOST} >Save</button>
                        </div>
		            </div>
		);
	}
});

/*Register Page*/
var OrganizationBankDetails = React.createClass({

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.OrganizationID !== prevProps.OrganizationID) {
            this.props.accountName = "";
            this.props.accountNumber = "";
            this.props.branchCode = "";
            this.props.branchName = ""; t
        }
    },

	render: function(){
		return (	
		            <div className="panel panel-default">
			            <div className="panel-heading">
				            Add Bank Details
			            </div>
			            <div className="panel-body">
				            <form>
						        <div className="form-group">
                                    <label>Account Name</label>
                                    <input id="AccountName" className="form-control" placeholder="Account Name" value={this.props.accountName} onChange={this.props.updateAccountName}/>
                                </div>
						        <div className="form-group">
                                    <label>Account Number</label>
                                    <input id="AccountNumber" className="form-control" placeholder="Account Number" value={this.props.accountNumber} onChange={this.props.updateAccountNumber}/>
                                </div>
						        <div className="form-group">
                                    <label>Branch Code</label>
                                    <input id="BranchCode" className="form-control" placeholder="Branch Code" value={this.props.branchCode} onChange={this.props.updateBranchCode}/>
                                </div>
						        <div className="form-group">
                                    <label>Branch Name</label>
                                    <input id="BranchName" className="form-control" placeholder="Branch Name" value={this.props.branchName} onChange={this.props.updateBranchName}/>
                                </div>	
                                <div className="form-group">
                                    <label>Account Type</label>
                                    <select className="form-control" value={this.props.selectedBankAccountType} onChange={this.props.updateBankAccountType}>
                                        {this.props.bankAccountTypes.map(function(obj){
                                            return <option key={obj.Key} value={obj.Key} >{obj.BankAccountTypeCode}</option>;
                                          })}
                                    </select>
                                </div>					
					        </form>
			            </div> 
                        <div className="panel-footer text-right">
                            <button type="button" className="btn btn-primary" onClick={this.props.bankDetailsPOST} >Save</button>
                        </div>
		            </div>
		);
	}
});

var CustodianDetails = React.createClass({

    getInitialState: function () {
        return {
            name: "",
            surname: "",
            jobTitle: "",
            landline: "",
            email: "",
            companyNumber: "",
            cell: "",
            organizationID : this.props.OrganizationID
        };
    },

    updatename: function (e) {
        this.setState({ name: e.target.value });       
    },
    updatesurname: function (e) {
        this.setState({ surname: e.target.value });       
    },
    updatejobTitle: function (e) {
        this.setState({ jobTitle: e.target.value });        
    },
    updatelandline: function (e) {
        this.setState({ landline: e.target.value });        
    },
    updateemail: function (e) {
        this.setState({ email: e.target.value });       
    },
    updatecompanyNumber: function (e) {
        this.setState({ companyNumber: e.target.value });       
    },
    updatecell: function (e) {
        this.setState({ cell: e.target.value });       
    },

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.OrganizationID !== prevProps.OrganizationID) {
            this.loadData();
        }
    },

    custodianDetailsPOST: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Organization/SaveCustodianDetails',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function (data) {               
                var opts = {
                    title: "Success",
                    text: "That thing that you were trying to do worked.",
                    addclass: "stack-bottomright",
                    type: "success",
                    nonblock: {
                        nonblock: true
                    }
                };
                new PNotify(opts);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Organization/SaveCustodianDetails', status, err.toString());
            }.bind(this)
        });
    },

    loadData: function () {
        this.setState({ name: "" });
        this.setState({ surname: "" });
        this.setState({ jobTitle: "" });
        this.setState({ landline: "" });
        this.setState({ email: "" });
        this.setState({ companyNumber: "" });
        this.setState({ cell: "" });
        $.ajax({
            url: 'api/Organization/CustodianDetails/' + this.props.OrganizationID,
            success: function (data) {
                if (data.length > 0){
                this.setState({ name: data[0].name });
                this.setState({ surname: data[0].surname });
                this.setState({ jobTitle: data[0].jobTitle });
                this.setState({ landline: data[0].landline });
                this.setState({ email: data[0].email });
                this.setState({ companyNumber: data[0].companyNumber });
                this.setState({ cell: data[0].cell });
                }
            }.bind(this)
        })
    },

    componentWillMount: function () {
        this.loadData();
    },

    render: function(){
        return (	
		            <div className="panel panel-default">
			            <div className="panel-heading">
				            Administrator
			            </div>
			            <div className="panel-body">
				            <form>
						        <div className="form-group">
                                    <label>Name</label>
                                    <input id="Name" className="form-control" placeholder="Name" value={this.state.name} onChange={this.updatename}/>
                                </div>
						        <div className="form-group">
                                    <label>surname</label>
                                    <input id="surname" className="form-control" placeholder="surname" value={this.state.surname} onChange={this.updatesurname}/>
                                </div>
						        <div className="form-group">
                                    <label>jobTitle</label>
                                    <input id="jobTitle" className="form-control" placeholder="jobTitle" value={this.state.jobTitle} onChange={this.updatejobTitle}/>
                                </div>
						        <div className="form-group">
                                    <label>landline</label>
                                    <input id="landline" className="form-control" placeholder="landline" value={this.state.landline} onChange={this.updatelandline}/>
                                </div>	
                                <div className="form-group">
                                    <label>email</label>
                                    <input id="email" className="form-control" placeholder="email" value={this.state.email} onChange={this.updateemail} />
                                </div>	
                                <div className="form-group">
                                    <label>companyNumber</label>
                                    <input id="companyNumber" className="form-control" placeholder="companyNumber" value={this.state.companyNumber} onChange={this.updatecompanyNumber} />
                                </div>	 
                                <div className="form-group">
                                    <label>cell</label>
                                    <input id="cell" className="form-control" placeholder="cell" value={this.state.cell} onChange={this.updatecell} />
                                </div>	                                   			
					        </form>
			            </div> 
                        <div className="panel-footer text-right">
                            <button type="button" className="btn btn-primary" onClick={this.custodianDetailsPOST} >Save</button>
                        </div>
		            </div>
		);
    }
});

var OrganizationBankDetailsList = React.createClass({	
    render: function () {
        
        function bankAccountTypeView(cell, row) {

            if (row.BankAccountTypeID == 1)
                return <div>Cheque</div>
            else if (row.BankAccountTypeID == 2)
                return <div>Savings</div>
            else
                return <div>Unknown</div>
        }

        return (	
		            <div className="panel panel-default">
			            <div className="panel-heading">
				            Bank Details
			            </div>
			            <div className="panel-body">
				            <BootstrapTable data={this.props.bankDetailsList} striped={true} hover={true} pagination={true} search={true}>
                              <TableHeaderColumn isKey={true} dataField="AccountNumber">AccountNumber</TableHeaderColumn>
                              <TableHeaderColumn dataField="AccountName">AccountName</TableHeaderColumn>
                              <TableHeaderColumn dataField="BranchName">BranchName</TableHeaderColumn>
                              <TableHeaderColumn dataField="BranchCode">BranchCode</TableHeaderColumn>                              
                              <TableHeaderColumn dataFormat={bankAccountTypeView}>BankAccountType</TableHeaderColumn>                                
				            </BootstrapTable>
			            </div>                         
		            </div>
		);
    }
});

var ContactDirectoryList = React.createClass({	
    render: function () {
        
        function bankAccountTypeView(cell, row) {

            if (row.BankAccountTypeID == 1)
                return <div>Cheque</div>
            else if (row.BankAccountTypeID == 2)
                return <div>Savings</div>
            else
                return <div>Unknown</div>
        }

        return (	
		            <div className="panel panel-default">
			            <div className="panel-heading">
				            Contact Directory
			            </div>
			            <div className="panel-body">
				            <BootstrapTable data={this.props.ContactDirectory} striped={true} hover={true} pagination={true} search={true}>
                              <TableHeaderColumn isKey={true} dataField="CellPhone">Cell</TableHeaderColumn>
                              <TableHeaderColumn dataField="Home">Home</TableHeaderColumn>
                              <TableHeaderColumn dataField="WorkPhone">Office</TableHeaderColumn>
                              <TableHeaderColumn dataField="Email">Email</TableHeaderColumn>                              
                             <TableHeaderColumn dataField="role">Role</TableHeaderColumn>                             
				            </BootstrapTable>
			            </div>                         
		            </div>
		);
    }
});


var DocumentRequirementsList = React.createClass({	
    render: function () {
        
        function ResolveView(cell, row) {

            if (row.ResolvedDate == "")
                return <div>Upload Document</div>           
            else
                return <div>Resolved</div>
        }

        return (	
		            <div className="panel panel-red">
			            <div className="panel-heading">
				            Document Requirements
			            </div>
			            <div className="panel-body">
				            <BootstrapTable data={this.props.DocumentRequirements} striped={true} hover={true}>
                              <TableHeaderColumn isKey={true} dataField="RequirementType">Requirement Type</TableHeaderColumn>
                              <TableHeaderColumn dataField="RequirementName">Document</TableHeaderColumn>
                              <TableHeaderColumn dataField="CreatedDate">Created</TableHeaderColumn>                             
                              <TableHeaderColumn dataFormat={ResolveView}>Resolution</TableHeaderColumn>                       
				            </BootstrapTable>
			            </div>                         
		            </div>
		);
    }
});

/*Register Page*/
var OrganizationExpertise = React.createClass({	

	getInitialState: function() {
        return {
            ExpertiseSubCategory: [],
            DocumentRequirements: []
        };
	},

	fetchDocumentRequirements: function (orgID) {
	    $.ajax({
	        url: 'api/Requirement/DOCUMENTREQUIREMENT/ORG/' + orgID,
	        dataType: 'json',
	        cache: false,
	        success: function (data) {
	            this.setState({ DocumentRequirements: data });

	            if (data.length > 0) {
	                var opts = {
	                    title: "Document Requirement",
	                    text: "Please resolve the Outstanding Document Requirements.",
	                    addclass: "stack-bottomright",
	                    type: "error",
	                    nonblock: {
	                        nonblock: true
	                    }
	                };
	                new PNotify(opts);
	            }

	        }.bind(this),
	        error: function (xhr, status, err) {
	            console.error('api/Requirements/Document/ORG/', status, err.toString());
	        }.bind(this)
	    });
	},

	fetchExpertiseCategory: function() {
        $.ajax({
          url: 'api/ExpertiseCategory/',
          dataType: 'json',
          cache: false,
          success: function(data) {
              this.setState({ ExpertiseSubCategory: data.data });
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('api/Address/ORG/', status, err.toString());
          }.bind(this)
        });
    },

	componentDidMount: function() {
		$("#ExpertiseSelect").select2();
	    this.fetchExpertiseCategory();
	    this.fetchUserCategories(this.props.OrganizationID);	    
	},

	componentDidUpdate(prevProps) {
	    // Typical usage (don't forget to compare props):
	    if (this.props.OrganizationID !== prevProps.OrganizationID) {
	        this.fetchUserCategories(this.props.OrganizationID);
	        this.fetchDocumentRequirements(this.props.OrganizationID);
	    }
	},

	fetchUserCategories1 : function(org) {
	    
        $.ajax({
                  url: 'api/ExpertiseCategory/GetExpertiseCategory/ORG/' + org,
                  type: 'GET',
                  dataType: 'json',
                  cache: false,
                  success: function(data) {
					var $select = $('#ExpertiseSelect');
					for (i = 0; i < data.data.length; i++) {

					    var $v = $('#ExpertiseSelect option[value = 1]');
					    var $option = $('<option selected>Loading...</option>').val(1);
						$select.append($option);
						$option.text(data.data[i].Name).val(data.data[i].Key);
						$option.removeData();
					}
					$select.trigger('change');
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error('api/Organization/Post', status, err.toString());
                  }.bind(this)
            });
    },

	fetchUserCategories : function(org) {
	    
        $.ajax({
                  url: 'api/ExpertiseCategory/GetExpertiseCategory/ORG/' + org,
                  type: 'GET',
                  dataType: 'json',
                  cache: false,
                  success: function (data) {
                      if (data.length == 0)
                      {
                          return;
                      }
					var $select = $('#ExpertiseSelect');
					for (i = 0; i < data.data.length; i++) {
					    var $option = $('#ExpertiseSelect option[value = '+data.data[i].Key+']');
					    $option.attr("selected", "selected");
						$option.removeData();
					}
					$select.trigger('change');
                  }.bind(this),
                  error: function(xhr, status, err) {
                      console.error('api/ExpertiseCategory/GetExpertiseCategory/ORG', status, err.toString());
                  }.bind(this)
            });
    },

	 userCategoriesPOST : function() {
	    var userCat = $('#ExpertiseSelect').val();

	     var postData = {
	         UserCategories: userCat,
			 Organization: this.props.OrganizationID
	     };

        console.log('POSTING FORM');
        $.ajax({
                  url: 'api/ExpertiseCategory/Post',
                  type: 'POST',
                  dataType: 'json',
                  data: postData,
                  cache: false,
                  success: function (data) {
                      this.fetchDocumentRequirements(this.props.OrganizationID);
                      var opts = {
                          title: "Success",
                          text: "That thing that you were trying to do worked.",
                          addclass: "stack-bottomright",
                          type: "success",
                          nonblock: {
                              nonblock: true
                          }
                      };
                      new PNotify(opts);                     
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error('api/Organization/Post', status, err.toString());
                  }.bind(this)
            });
    },

	render: function(){
	    return (
                    <div>
		            <div className="panel panel-default">
			            <div className="panel-heading">
				            Please select your expertise
			            </div>
			            <div className="panel-body">
                            <select id="ExpertiseSelect" className="form-control" multiple="multiple" style={{width:'100%'}}>
                                {this.state.ExpertiseSubCategory.map(function(obj){
                                            return <option value={obj.ExpertiseSubCategoryID} >{obj.SubCategoryName}</option>;
                                          })}
                            </select>
			            </div> 
                        <div className="panel-footer text-right">
                            <button type="button" className="btn btn-primary" onClick= {this.userCategoriesPOST} >Save</button>
                        </div>
		            </div>
                        <DocumentRequirementsList DocumentRequirements={this.state.DocumentRequirements} />
                    </div>

		);
	}
});

var UserExpertiseAdd = React.createClass({

    getInitialState: function () {
        return {
            ExpertiseName: ""           
        };
    },

    ExpertiseNameChange: function (e) {
        this.setState({ ExpertiseName: e.target.value });
    },

    AddExpertise: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/ExpertiseCategory/Add',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function (data) {
                var opts = {
                    title: "Success",
                    text: "That thing that you were trying to do worked.",
                    addclass: "stack-bottomright",
                    type: "success",
                    nonblock: {
                        nonblock: true
                    }
                };
                new PNotify(opts);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/ExpertiseCategory/Add', status, err.toString());
            }.bind(this)
        });
    },
    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-7">                                        
                                Add Expertise
                            </div>                                   
                        </div>
                    </div>
                    <div className="panel-body">  
                        <p className="text-danger">If you cant find your expertise, please add it here:</p>                              
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" value={this.state.ExpertiseName} onChange={this.ExpertiseNameChange} placeholder="Expertise" />
                        </div>                        
                    </div>
                    <div className="panel-footer">
                        <div className="text-right">                                    
                            <button type="button" onClick={this.AddExpertise} className="btn btn-primary btn-md">Add</button>
                        </div>
                    </div>
                </div>
            )
}
});


var PersonalDetails = React.createClass({
    getInitialState: function() {
        return {
            Name: '',
            TradingName: '',
            RegistrationNumber: '',
            VatNumber: '',
            TaxNumber: '',
            OrganizationID: '',
            CellNumber : '',
            HomeNumber : '',
            OfficeNumber : '',
            Email : '',
            AddressLine1 : '',
            AddressLine2 : '',
            AddressLine3 : '',
            AddressLine4 : '',
            AddressLine5 : '',
            PostalCode : '',
            AddressID : '',
            OwnerType : 'ORG',
            AccountName: '',
            AccountNumber : '',
            BranchCode : '',
            BranchName : '',
            BankAccountType : [],
            SelectedBankAccountType : '',
            OEM: 'false',
            UserID: '',
            bankDetailsList: []
        };
    },

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ OrganizationID: decodedToken.OrganizationID });
        this.setState({ UserID: decodedToken.UserID });
    },

    fetchAddressDetails: function (UserID) {
        $.ajax({
            url: 'api/Address/PER/' + UserID,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var obj = $.parseJSON(data);
                if (obj.addressLine1 != null)
                    this.setState({AddressLine1 : obj.addressLine1});
              
                if (obj.addressLine2 != null)
                    this.setState({AddressLine2 : obj.addressLine2});
              
                if (obj.addressLine3 != null)
                    this.setState({AddressLine3 : obj.addressLine3});
              
                if (obj.addressLine4 != null)
                    this.setState({AddressLine4 : obj.addressLine4});
              
                if (obj.addressLine5 != null)
                    this.setState({AddressLine5 : obj.addressLine5});
              
                if (obj.postalCode != null)
                    this.setState({PostalCode : obj.postalCode});

                if (obj.addressID != null)
                    this.setState({AddressID : obj.addressID});

            }.bind(this),
            error: function(xhr, status, err) {
                console.error('api/Address/ORG/', status, err.toString());
            }.bind(this)
        });
    },

    fetchContactDetails: function(orgID) {
        $.ajax({
            url: 'api/Communication/PER/' + orgID,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var obj = $.parseJSON(data);
              
                if (obj.Home != null)
                    this.setState({HomeNumber : obj.Home});
              
                if (obj.CellPhone != null)
                    this.setState({CellNumber : obj.CellPhone});
              
                if (obj.WorkPhone != null)
                    this.setState({OfficeNumber : obj.WorkPhone});
              
                if (obj.Email != null)
                    this.setState({Email : obj.Email});

            }.bind(this),
            error: function(xhr, status, err) {
                console.error('api/Address/ORG/', status, err.toString());
            }.bind(this)
        });
    },

    fetchBankDetails: function(orgID) {
        $.ajax({
            url: 'api/BankAccount/PER/' + orgID,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ bankDetailsList: data.data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('api/BankAccount/ORG', status, err.toString());
            }.bind(this)
        });
    },

    fetchAccountTypes: function() {
        $.ajax({
            url: 'api/BankAccount/BankAccountTypes/',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ BankAccountType: data.data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('api/Address/ORG/', status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {        
        this.fetchAddressDetails(this.state.UserID);
        this.fetchContactDetails(this.state.UserID);
        this.fetchAccountTypes();
        this.fetchBankDetails(this.state.UserID);
    },
    
    registerUserPOST : function() {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Organization/Post',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function(data) {
                var opts = {
                    title: "Success",
                    text: "That thing that you were trying to do worked.",
                    addclass: "stack-bottomright",
                    type: "success",
                    nonblock: {
                        nonblock: true
                    }
                };
                new PNotify(opts);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('api/Organization/Post', status, err.toString());
            }.bind(this)
        });
    },

    addressPOST : function() {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Address/Post',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function(data) {
                var opts = {
                    title: "Success",
                    text: "That thing that you were trying to do worked.",
                    addclass: "stack-bottomright",
                    type: "success",
                    nonblock: {
                        nonblock: true
                    }
                };
                new PNotify(opts);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('api/Organization/Post', status, err.toString());
            }.bind(this)
        });
    },

    contactPOST : function() {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Communication/PostOrganization',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function(data) {
                var opts = {
                    title: "Success",
                    text: "That thing that you were trying to do worked.",
                    addclass: "stack-bottomright",
                    type: "success",
                    nonblock: {
                        nonblock: true
                    }
                };
                new PNotify(opts);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('api/Organization/Post', status, err.toString());
            }.bind(this)
        });
    },

    bankDetailsPOST : function() {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/BankAccount/Post',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function (data) {
                this.fetchBankDetails(this.state.OrganizationID);
                var opts = {
                    title: "Success",
                    text: "That thing that you were trying to do worked.",
                    addclass: "stack-bottomright",
                    type: "success",
                    nonblock: {
                        nonblock: true
                    }
                };
                new PNotify(opts);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('api/BankAccount/Post', status, err.toString());
            }.bind(this)
        });
    },

    updateBankAccountType : function(e){
        this.setState({SelectedBankAccountType : e.target.value});		
    },
    updateName : function(e){
        this.setState({Name : e.target.value});		
    },
    updateTradingName : function(e){
        this.setState({TradingName : e.target.value});		
    },
    updateRegistrationNumber : function(e){
        this.setState({RegistrationNumber : e.target.value});		
    },
    updateVatNumber : function(e){
        this.setState({VatNumber : e.target.value});		
    },
    updateTaxNumber : function(e){
        this.setState({TaxNumber : e.target.value});		
    },
    updateAddLine1 : function(e){
        this.setState({AddressLine1 : e.target.value});		
    },
    updateAddLine2 : function(e){
        this.setState({AddressLine2 : e.target.value});		
    },
    updateAddLine3 : function(e){
        this.setState({AddressLine3 : e.target.value});	
        console.log(this.state.AddressLine3);		
    },
    updateAddLine4 : function(e){
        this.setState({AddressLine4 : e.target.value});		
    },
    updateAddLine5 : function(e){
        this.setState({AddressLine5 : e.target.value});	
        console.log(this.state.AddressLine5);		
    },
    updatePostalCode : function(e){
        this.setState({PostalCode : e.target.value});	
        console.log(this.state.PostalCode);		
    },updateCellNumberState : function(e){
        this.setState({CellNumber : e.target.value});	
        console.log(this.state.CellNumber);			
    },
    updateHomeNumberState : function(e){
        this.setState({HomeNumber : e.target.value});		
    },
    updateOfficeNumberState : function(e){
        this.setState({OfficeNumber : e.target.value});		
    },
    updateEmailState : function(e){
        this.setState({Email : e.target.value});
        console.log(this.state.Email);		
    },
    updateAccountName : function(e){
        this.setState({AccountName : e.target.value});
        console.log(this.state.AccountName);		
    },
    updateAccountNumber : function(e){
        this.setState({AccountNumber : e.target.value});
        console.log(this.state.AccountNumber);		
    },
    updateBranchCode : function(e){
        this.setState({BranchCode : e.target.value});
        console.log(this.state.BranchCode);		
    },
    updateBranchName : function(e){
        this.setState({BranchName : e.target.value});
        console.log(this.state.BranchName);		
    },
    updateOEM : function(e){
        this.setState({OEM : e.target.value});
        console.log(this.state.OEM);		
    },

    render: function() {
        var navBarSyle= {
            marginBottom:0
        };

        return (	
                <div>		
				    <nav className="navbar navbar-default navbar-static-top" role="navigation" style={navBarSyle}>
	                    <NavHeader />
                        <NavMenu />
                    </nav>
                    <div id="page-wrapper">
	                    <div className="row">
		                    <div className="col-lg-12">
			                    <h1 className="page-header">Personal Details</h1>
		                    </div>                
	                    </div>
                        <div className="row"> 
                            <ul className="nav nav-tabs">		                       
		                        <li className="active"><a href="#Contact" data-toggle="tab" aria-expanded="false">Contact</a>
		                        </li>
		                        <li className=""><a href="#Address" data-toggle="tab" aria-expanded="false">Address</a>
		                        </li>
                                <li className=""><a href="#BankDetails" data-toggle="tab" aria-expanded="false">Bank Details</a>
		                        </li>                                
	                        </ul>	
	                        <div className="tab-content">		                       
                                <div className="tab-pane fade active in" id="Contact">
                                    <div className="col-lg-8">
                                        <br/>
                                        <OrganizationContact 
                                        cellNumber={this.state.CellNumber} updateCellNumber={this.updateCellNumberState}
                                        homeNumber={this.state.HomeNumber} updateHomeNumber={this.updateHomeNumberState}
                                        officeNumber={this.state.OfficeNumber} updateOfficeNumber={this.updateOfficeNumberState}
                                        email={this.state.Email} updateEmail={this.updateEmailState} contactPOST= {this.contactPOST} />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Address">
                                    <div className="col-lg-8">
                                        <br/>
                                        <OrganizationAddress addressLine1={this.state.AddressLine1} updateAddressLine1={this.updateAddLine1}
                                addressLine2={this.state.AddressLine2} updateAddressLine2={this.updateAddLine2}
                                addressLine3={this.state.AddressLine3} updateAddressLine3={this.updateAddLine3}
                                addressLine4={this.state.AddressLine4} updateAddressLine4={this.updateAddLine4}
                                addressLine5={this.state.AddressLine5} updateAddressLine5={this.updateAddLine5}
                                postalCode={this.state.PostalCode} updatePostalCode={this.updatePostalCode} addressPOST= {this.addressPOST} />
                                </div>
                                </div>
                                <div className="tab-pane fade" id="BankDetails">
                                    <div className="col-lg-6">
                                        <br/>
                                        <OrganizationBankDetails accountName={this.state.AccountName} updateAccountName={this.updateAccountName}
                                accountNumber={this.state.AccountNumber} updateAccountNumber={this.updateAccountNumber}
                                branchCode={this.state.BranchCode} updateBranchCode={this.updateBranchCode}
                                branchName={this.state.BranchName} updateBranchName={this.updateBranchName}
                                accountType={this.state.AccountType} updateAccountType={this.updateAccountType}
                                bankDetailsPOST= {this.bankDetailsPOST} bankAccountTypes= {this.state.BankAccountType} updateBankAccountType= {this.updateBankAccountType} selectedBankAccountType= {this.state.SelectedBankAccountType} />
                                </div>
                                <div className="col-lg-6">
                                    <br />                                        
                                    <OrganizationBankDetailsList bankDetailsList={this.state.bankDetailsList} BankAccountType={this.state.BankAccountType}/>
                                </div>
                                </div>
</div>
                            
</div>
</div>
</div>       
            )
}
});