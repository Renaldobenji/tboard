/*Register Page*/
var OrganizationInformation = React.createClass({
    
	getInitialState: function() {
        return {
            OrganizationInformation: [],
            DocumentRequirements: [],
            OrganizationID : "",			
            UserID: "",
            updateLetterHead: "NO",
            updateCompanyProfile: "NO",
            updateQuotationExample: "NO",
            updatePurchaseOrderExample: "NO",
            updateInvoiceExample: "NO",
            updateSuppliersDocuments: "NO",
            updateSuppliersCount: "0",
            updateRegisterShares: "NO",
            updateEmergencyStrikes: "NO"
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


	OrgInfoPOST: function () {
	    console.log('POSTING FORM');
	    $.ajax({
	        url: 'api/Organization/MetaData/OrgInfo',
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
	            console.error('api/Organization/MetaData/OrgInfo', status, err.toString());
	        }.bind(this)
	    });
	},

	updateLetterHead: function (e) {
	    this.setState({ updateLetterHead: e.target.value });
	    console.log(this.state.updateLetterHead);
	},
	updateCompanyProfile: function (e) {
	    this.setState({ updateCompanyProfile: e.target.value });
	    console.log(this.state.updateCompanyProfile);
	},
	updateQuotationExample: function (e) {
	    this.setState({ updateQuotationExample: e.target.value });
	    console.log(this.state.updateQuotationExample);
	},
	updatePurchaseOrderExample: function (e) {
	    this.setState({ updatePurchaseOrderExample: e.target.value });
	    console.log(this.state.updatePurchaseOrderExample);
	},
	updateInvoiceExample: function (e) {
	    this.setState({ updateInvoiceExample: e.target.value });
	    console.log(this.state.updateInvoiceExample);
	},
	updateSuppliersDocuments: function (e) {
	    this.setState({ updateSuppliersDocuments: e.target.value });
	    console.log(this.state.updateSuppliersDocuments);
	},
	updateSuppliersCount: function (e) {
	    this.setState({ updateSuppliersCount: e.target.value });
	    console.log(this.state.updateSuppliersCount);
	},
	updateRegisterShares: function (e) {
	    this.setState({ updateRegisterShares: e.target.value });
	    console.log(this.state.updateRegisterShares);
	},
	updateEmergencyStrikes: function (e) {
	    this.setState({ updateEmergencyStrikes: e.target.value });
	    console.log(this.state.updateEmergencyStrikes);
	},


	componentWillMount: function () {
	    var tokens = new TboardJWTToken();
	    var decodedToken = tokens.getJWTToken();
	    this.setState({ OrganizationID: decodedToken.OrganizationID });
	    this.setState({ UserID: decodedToken.UserID });	    
	},

	componentDidUpdate(prevProps) {
	    // Typical usage (don't forget to compare props):
	    if (this.props.OrganizationID !== prevProps.OrganizationID) {	       
	        this.fetchDocumentRequirements(this.state.OrganizationID);
	    }
	},

   
    
    componentDidMount: function() {
        this.fetchDocumentRequirements(this.state.OrganizationID);
    },	
		
	render: function(){
        var navBarSyle= {
              marginBottom:0
        };

        var overflowStyle = {
            overflow: "hidden",
            width: "auto"   
        };
	    
        
		return (
	                <div>		
				        <nav className="navbar navbar-default navbar-static-top" role="navigation" style={navBarSyle}>
	                        <NavHeader />
                            <NavMenu />
                        </nav>
                        <div id="page-wrapper"  >
	                        <div className="row">
		                        <div className="col-lg-10">
			                        <h1 className="page-header">
                                        Organization Information																		
                                    </h1>
		                        </div>
	                        </div>
                            <br/>
                            <div className="row">
                              <div className="col-lg-10">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            Please complete the following
                        </div>
                      
                        <div className="panel-body" style={overflowStyle}>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Question</th>
                                            <th>Answer</th>                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Does your company have a company profile?</td>
                                            <td><select  onChange={this.updateCompanyProfile} className="form-control">                                            <option>NO</option><option>YES</option></select>
                                            </td>                                           
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Can you provide your company's letterhead?</td>
                                            <td>                                            <select onChange={this.updateLetterHead} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>                                            
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Can you provide an example of a quotation done by your company?
                                            (Note: All pricing can be removed)</td>
                                            <td>                                            <select onChange={this.updateQuotationExample} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>                                            
                                        </tr>
                                        <tr>
                                             <td>4</td>
                                            <td>Can you provide a typical example of a purchase order issued to a supplier by your company?</td>
                                            <td>                                            <select onChange={this.updatePurchaseOrderExample} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>                                           
                                        </tr>
                                        <tr>
                                             <td>5</td>
                                            <td>Can you provide a typical example of an invoice from your company?</td>
                                            <td>                                            <select onChange={this.updateInvoiceExample} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
                                        </tr>
                                        <tr>
                                             <td>6</td>
                                            <td>Do you check whether your suppliers’ legal documentation is in place and up to date before making use of them?</td>
                                            <td>                                            <select onChange={this.updateSuppliersDocuments} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
                                        </tr>
                                        <tr>
                                             <td>7</td>
                                            <td>How may suppliers does your company have?</td>
                                            <td>                                            <select onChange={this.updateSuppliersCount} className="form-control">                                              <option>0</option>                                          <option>1-10</option><option>10-1000</option></select></td>
                                        </tr>
                                        <tr>
                                             <td>8</td>
                                            <td>Does you company have a shares register?</td>
                                            <td>                                            <select onChange={this.updateRegisterShares} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
                                        </tr>
                                        <tr>
                                             <td>9</td>
                                            <td>Does your company have an emergency plan for strikes?
(How will you ensure that your clients aren't affected when your suppliers | employees go on strike?)</td>
                                            <td>                                            <select onChange={this.updateEmergencyStrikes} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
                                        </tr>   
                                         <tr>
                                             <td></td>
                                            <td>
                                               
                                            </td>
                                            <td>                                            <button type="button" className="btn btn-primary" onClick={this.OrgInfoPOST}>Save</button></td>
                                         </tr>                                       
                                    </tbody>
                                </table>                          
                            </div>
                            <br/>
                           <DocumentRequirementsList OrgID={this.props.OrganizationID} DocumentRequirements={this.state.DocumentRequirements} />
                        </div>
                        
                    </div>
                                
                              </div>
	                        </div>
                        </div>
							
                    </div>  
                
		);
	}
});

