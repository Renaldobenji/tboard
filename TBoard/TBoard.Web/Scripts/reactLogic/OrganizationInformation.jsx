/*Register Page*/
var OrganizationInformation = React.createClass({
    
	getInitialState: function() {
        return {
            OrganizationInformation: [],
            DocumentRequirements: [],
            OrganizationID : "",			
            UserID : ""
        };
	},

	componentWillMount: function () {
	    var tokens = new TboardJWTToken();
	    var decodedToken = tokens.getJWTToken();
	    this.setState({ OrganizationID: decodedToken.OrganizationID });
	    this.setState({ UserID: decodedToken.UserID });	    
	},

   
    
    componentDidMount: function() {
      
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
                                            <td><select className="form-control"><option>YES</option><option>NO</option></select>
                                            </td>                                           
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Can you provide your company's letterhead?</td>
                                            <td>                                            <select className="form-control"><option>YES</option><option>NO</option></select></td>                                            
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Can you provide an example of a quotation done by your company?
                                            (Note: All pricing can be removed)</td>
                                            <td>                                            <select className="form-control"><option>YES</option><option>NO</option></select></td>                                            
                                        </tr>
                                        <tr>
                                             <td>4</td>
                                            <td>Can you provide a typical example of a purchase order issued to a supplier by your company?</td>
                                            <td>                                            <select className="form-control"><option>YES</option><option>NO</option></select></td>                                           
                                        </tr>
                                        <tr>
                                             <td>5</td>
                                            <td>Can you provide a typical example of an invoice from your company?</td>
                                            <td>                                            <select className="form-control"><option>YES</option><option>NO</option></select></td>
                                        </tr>
                                        <tr>
                                             <td>6</td>
                                            <td>Do you check whether your suppliers’ legal documentation is in place and up to date before making use of them?</td>
                                            <td>                                            <select className="form-control"><option>YES</option><option>NO</option></select></td>
                                        </tr>
                                        <tr>
                                             <td>7</td>
                                            <td>How may suppliers does your company have?</td>
                                            <td>                                            <select className="form-control"><option>YES</option><option>NO</option></select></td>
                                        </tr>
                                        <tr>
                                             <td>8</td>
                                            <td>Does you company have a shares register?</td>
                                            <td>                                            <select className="form-control"><option>YES</option><option>NO</option></select></td>
                                        </tr>
                                        <tr>
                                             <td>9</td>
                                            <td>Does your company have an emergency plan for strikes?
(How will you ensure that your clients aren't affected when your suppliers | employees go on strike?)</td>
                                            <td>                                            <select className="form-control"><option>YES</option><option>NO</option></select></td>
                                        </tr>                                        
                                    </tbody>
                                </table>
                            </div>
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

