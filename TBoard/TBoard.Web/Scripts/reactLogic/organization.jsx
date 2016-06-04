var Organization = React.createClass({
    getInitialState: function() {
        return {
            Name: '',
            TradingName: '',
            RegistrationNumber: '',
            VatNumber: '',
            TaxNumber: '',
            OrganizationID: "",
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
            OwnerType : 'ORG'    
        };
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
          url: 'api/Communication/ORG/' + orgID,
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

    componentDidMount: function() {
        this.fetchOrgDetails(1);
        this.fetchAddressDetails(1);
        this.fetchContactDetails(1);
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
                      alert("Success");
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
                      alert("Success");
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
                      alert("Success");
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error('api/Organization/Post', status, err.toString());
                  }.bind(this)
            });
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
			                    <h1 className="page-header">Organization Details</h1>
		                    </div>                
	                    </div>
                        <div className="row"> 
                            <ul className="nav nav-tabs">
		                        <li className="active"><a href="#Details" data-toggle="tab" aria-expanded="true">Details</a>
		                        </li>
		                        <li className=""><a href="#Contact" data-toggle="tab" aria-expanded="false">Contact</a>
		                        </li>
		                        <li className=""><a href="#Address" data-toggle="tab" aria-expanded="false">Address</a>
		                        </li>
	                        </ul>	
	                        <div className="tab-content">
		                        <div className="tab-pane fade active in" id="Details">
			                        <div className="col-lg-8">
                                        <br/>
                                        <OrganizationDetails  Name={this.state.Name} TradingName={this.state.TradingName} RegistrationNumber={this.state.RegistrationNumber} VatNumber={this.state.VatNumber} TaxNumber={this.state.TaxNumber}
                                                      updateName={this.updateName}  updateTradingName={this.updateTradingName} updateRegistrationNumber={this.updateRegistrationNumber} updateVatNumber={this.updateVatNumber} updateTaxNumber={this.updateTaxNumber} registerUserPOST= {this.registerUserPOST} />
                                    </div>
		                        </div>
		                        <div className="tab-pane fade" id="Contact">
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
				            Contact Information
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
					        </form>
			            </div> 
                        <div className="panel-footer text-right">
                            <button type="button" className="btn btn-primary" onClick={this.props.contactPOST} >Save</button>
                        </div>
		            </div>
		);
	}
});