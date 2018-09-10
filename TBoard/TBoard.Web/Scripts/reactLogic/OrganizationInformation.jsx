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

var HumanResourcesInformation = React.createClass({
    
    getInitialState: function() {
        return {
            OrganizationInformation: [],
            DocumentRequirements: [],
            OrganizationID : "",			
            UserID: "",
            companyOrganogram: "NO",
            employmentEquityPolicy: "NO",
            employmentEquityReport: "NO",
            EEA2document: "NO",
            EEA4document: "NO",
            socialLabourPlan: "NO",
            employmentContracts: "NO",
            workplaceSkillsPlan: "NO",
            employeeAttendanceRegister: "NO",
            basicConditionsofEmploymentAct: "NO",
            employmentEquityAct : "NO"
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


    HRInfoPOST: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Organization/MetaData/HRInfo',
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

    companyOrganogram: function (e) {
        this.setState({ companyOrganogram: e.target.value });
        console.log(this.state.companyOrganogram);
    },
    employmentEquityPolicy: function (e) {
        this.setState({ employmentEquityPolicy: e.target.value });
        console.log(this.state.employmentEquityPolicy);
    },
    employmentEquityReport: function (e) {
        this.setState({ employmentEquityReport: e.target.value });
        console.log(this.state.employmentEquityReport);
    },
    EEA2document: function (e) {
        this.setState({ EEA2document: e.target.value });
        console.log(this.state.EEA2document);
    },
    EEA4document: function (e) {
        this.setState({ EEA4document: e.target.value });
        console.log(this.state.EEA4document);
    },
    socialLabourPlan: function (e) {
        this.setState({ socialLabourPlan: e.target.value });
        console.log(this.state.socialLabourPlan);
    },
    employmentContracts: function (e) {
        this.setState({ employmentContracts: e.target.value });
        console.log(this.state.employmentContracts);
    },
    workplaceSkillsPlan: function (e) {
        this.setState({ workplaceSkillsPlan: e.target.value });
        console.log(this.state.workplaceSkillsPlan);
    },
    employeeAttendanceRegister: function (e) {
        this.setState({ employeeAttendanceRegister: e.target.value });
        console.log(this.state.employeeAttendanceRegister);
    },
    basicConditionsofEmploymentAct: function (e) {
        this.setState({ basicConditionsofEmploymentAct: e.target.value });
        console.log(this.state.basicConditionsofEmploymentAct);
    },
    employmentEquityAct: function (e) {
        this.setState({ employmentEquityAct: e.target.value });
        console.log(this.state.employmentEquityAct);
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
                                        HR Information																		
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
                                            <td>Does your company have a company organogram?</td>
                                            <td><select  onChange={this.companyOrganogram} className="form-control">                                            <option>NO</option><option>YES</option></select>
                                            </td>                                           
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Does your company have an Employment Equity Policy? </td>
                                            <td>                                            <select onChange={this.employmentEquityPolicy} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>                                            
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Has your company submitted an Employment Equity Report for the last financial year to the Department of Labour?</td>
<td>                                            <select onChange={this.employmentEquityReport} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>                                            
</tr>
<tr>
 <td>4</td>
<td>Does your company have a EEA2 document?</td>
<td>                                            <select onChange={this.EEA2document} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>                                           
</tr>
<tr>
 <td>5</td>
<td>If your company has more than 50 employees please upload your EEA 4 document?</td>
<td>                                            <select onChange={this.EEA4document} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
</tr>
<tr>
 <td>6</td>
<td>Does your company have a Social Labour Plan?</td>
<td>                                            <select onChange={this.socialLabourPlan} className="form-control"> <option>NO</option>                                            <option>YES</option></select></td>
</tr>
<tr>
 <td>7</td>
<td>Please upload an example of your company's Employment Contracts?</td>
<td>                                            <select onChange={this.employmentContracts} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
</tr>
<tr>
 <td>8</td>
<td>Does your company have a Workplace Skills Plan?</td>
<td>                                            <select onChange={this.workplaceSkillsPlan} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
</tr>
<tr>
 <td>9</td>
<td>Does your company have an Employee Attendance Register?</td>
<td>                                            <select onChange={this.employeeAttendanceRegister} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
</tr>   
                                        <tr>
 <td>9</td>
<td>
    Does your company display a summary of the Basic Conditions of Employment Act within your workplace?
</td>
<td>                                            <select onChange={this.basicConditionsofEmploymentAct} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
                                        </tr>   
                                        <tr>
 <td>9</td>
<td>
    Does your company display a summary of the Employment Equity Act within your workplace?
</td>
<td>                                            <select onChange={this.employmentEquityAct} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
                                        </tr>   
<tr>
 <td></td>
<td>
                                               
</td>
<td>                                            <button type="button" className="btn btn-primary" onClick={this.HRInfoPOST}>Save</button></td>
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


var InsuranceAndRisk = React.createClass({
    
    getInitialState: function() {
        return {
            OrganizationInformation: [],
            DocumentRequirements: [],
            OrganizationID : "",			
            UserID: "",
            BuildingsInsurance: "NO",
            PublicLiabilityInsurancePolicy: "NO",
            CompanyThirdPartyInsurancePolicy: "NO",
            CompanyProfessionalIndemnityInsurancePolicy: "NO",
            CompanyGoodsinTransitInsurancePolicy: "NO"           
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


    InsuranceRiskPOST: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Organization/MetaData/InsuranceRiskInfo',
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

    BuildingsInsurance: function (e) {
        this.setState({ BuildingsInsurance: e.target.value });
        console.log(this.state.BuildingsInsurance);
    },
    PublicLiabilityInsurancePolicy: function (e) {
        this.setState({ PublicLiabilityInsurancePolicy: e.target.value });
        console.log(this.state.PublicLiabilityInsurancePolicy);
    },
    CompanyThirdPartyInsurancePolicy: function (e) {
        this.setState({ CompanyThirdPartyInsurancePolicy: e.target.value });
        console.log(this.state.CompanyThirdPartyInsurancePolicy);
    },
    CompanyProfessionalIndemnityInsurancePolicy: function (e) {
        this.setState({ CompanyProfessionalIndemnityInsurancePolicy: e.target.value });
        console.log(this.state.CompanyProfessionalIndemnityInsurancePolicy);
    },
    CompanyGoodsinTransitInsurancePolicy: function (e) {
        this.setState({ CompanyGoodsinTransitInsurancePolicy: e.target.value });
        console.log(this.state.CompanyGoodsinTransitInsurancePolicy);
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
                                        Insurance Information																		
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
                                            <td>Does your company have Buildings / Vehicles / Other assets Insurance? Upload your short term Insurance policy</td>
                                            <td><select  onChange={this.BuildingsInsurance} className="form-control">                                            <option>NO</option><option>YES</option></select>
                                            </td>                                           
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Does your company perform work at client's premises? Upload your company's Public Liability Insurance policy</td>
                                            <td>                                            <select onChange={this.PublicLiabilityInsurancePolicy} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>                                            
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Does your company transport products or people? Upload your company's Third Party Insurance policy</td>
<td>                                            <select onChange={this.CompanyThirdPartyInsurancePolicy} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>                                            
</tr>
<tr>
 <td>4</td>
<td>Does your company provide professional services? Upload your company's Professional Indemnity Insurance policy</td>
<td>                                            <select onChange={this.CompanyProfessionalIndemnityInsurancePolicy} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>                                           
</tr>
<tr>
 <td>5</td>
<td>Does your company have Goods in Transit Insurance? Upload your company's Goods in Transit Insurance policy</td>
<td>                                            <select onChange={this.CompanyGoodsinTransitInsurancePolicy} className="form-control"><option>NO</option>                                            <option>YES</option></select></td>
</tr> 
<tr>
 <td></td>
<td>
                                               
</td>
<td>                                            <button type="button" className="btn btn-primary" onClick={this.InsuranceRiskPOST}>Save</button></td>
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
