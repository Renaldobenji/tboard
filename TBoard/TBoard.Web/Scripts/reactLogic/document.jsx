/*Register Page*/
var DocumentManagement = React.createClass({
    
	getInitialState: function() {
        return {
            MissingRequirements: [],
            OrganizationID : "",
			FileName : "",
			DocumentType: "",
			UploadURL: "",
            UserID : ""
        };
	},

	componentWillMount: function () {
	    var tokens = new TboardJWTToken();
	    var decodedToken = tokens.getJWTToken();
	    this.setState({ OrganizationID: decodedToken.OrganizationID });
	    this.setState({ UserID: decodedToken.UserID });
	    this.setState({ UploadURL: "Upload?key=" + decodedToken.OrganizationID });	    
	},

    fetchMissingRequirements: function (orgID) {
        console.log(orgID)
        $.ajax({
          url: 'api/Document/GetOutstandingRequirements/' + orgID,
          dataType: 'json',
          cache: false,
          success: function(result) {
              this.setState({MissingRequirements : result.data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('api/organization', status, err.toString());
          }.bind(this)
        });
    },
    
    componentDidMount: function() {
        this.fetchMissingRequirements(this.state.OrganizationID);
    },

	updateFileName: function(e) {
        this.setState({FileName : e.target.value});
    },

	updateDocumentType: function(e) {
        this.setState({DocumentType : e.target.value});
    },

	uploadfile: function() {
	    alert(this.state.FileName);
		alert(this.state.DocumentType);
	},
		
	render: function(){
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
			                        <h1 className="page-header">
                                        Document Management 
										 &nbsp;
                                        <a href={this.state.UploadURL} id="fakeLink" target="_blank"><button className="btn btn-outline btn-primary">
			                               Upload
		                                </button></a>										
                                    </h1>
		                        </div>
	                        </div>
                            <div className="row">
                                <div className="col-lg-8">
			                        <DocumentList OrganizationID={this.state.OrganizationID}/>
		                        </div>
		                        <div className="col-lg-4">
			                        <DocumentRequirements MissingRequirements= {this.state.MissingRequirements} />
		                        </div>
	                        </div>
                        </div>
						<form method="post" action="api/Document/Upload" enctype="multipart/form-data">
							<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
											<h4 className="modal-title" id="myModalLabel">Upload Document</h4>
										</div>
										<div className="modal-body">
						                
												<div className="form-group">
													<label>Document Type</label>
													<select id="DocumentType" name="DocumentType" className="form-control" value={this.state.DocumentType} onChange={this.updateDocumentType}>
														{this.state.MissingRequirements.map(function(obj){
															return <option value={obj.documentCode} >{obj.documentCode} - {obj.documentDescription}</option>;
														  })}
													</select>
												</div>
												<div className="form-group">
													<label>File Path</label>
													<input id="UploadFile" name="UploadFile" type="file" className="form-control" value={this.state.FileName} onChange={this.updateFileName} />
												</div>
											   <input id="OrganizationID" name="OrganizationID" type="hidden" value={this.state.OrganizationID}/>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
											<button type="submit" className="btn btn-primary">Upload</button>
										</div>
									</div>				
								</div>	
							</div>
						</form>		
                    </div>  
                
		);
	}
});


/*Register Page*/
var DocumentRequirements = React.createClass({
    	
	render: function(){
        var navBarSyle= {
              marginBottom:0
            };
      
		return (
	                <div>		
				       <div className="panel panel-red">
                            <div className="panel-heading">
                                Missing Document Requirements
                            </div>
                            <div className="panel-body">
                                <h4><small className="text-danger">Please upload the following documents</small></h4>
                                <ul>
                                    {this.props.MissingRequirements.map(function(obj){
                                        return <li>{obj.documentCode} - {obj.documentDescription}</li>;
                                      })}
                                </ul>
                            </div>
                        </div>
                    </div>  
                
		);
	}
});


/*Register Page*/
var DocumentList = React.createClass({

    getInitialState: function () {
        return { data: [] }
    },

    loadData: function () {
        $.ajax({           
            url: 'api/Document/' ,
            success: function (data) {
                this.setState({ data: data.data });
            }.bind(this)
        })
    },

    componentWillMount: function () {
        this.loadData();
    },
    	
    render: function(){
        var navBarSyle= {
            marginBottom:0
        };            

        function actionsFormatter(cell, row) {
            return <ExpiryView verified={row.verified }/>;
        }
        
        return (
                    <div className="col-lg-12">
				        <BootstrapTable data={this.state.data} striped={true} hover={true} pagination={true} search={true}>
                          <TableHeaderColumn isKey={true} dataField="documentTypeCode" dataSort={true}>documentTypeCode</TableHeaderColumn>
                          <TableHeaderColumn dataField="documentDescription" dataSort={true}>documentDescription</TableHeaderColumn>
                          <TableHeaderColumn dataField="dateCreated" dataSort={true}>dateCreated</TableHeaderColumn>
                          <TableHeaderColumn dataField="expiryDate" dataSort={true}>expiryDate</TableHeaderColumn>                          
                          <TableHeaderColumn dataFormat={actionsFormatter}>verified</TableHeaderColumn>
				        </BootstrapTable>
			        </div>
                
		);
    }
});

var ExpiryView = React.createClass({

    render: function () {
        
        return (
            <div>
                { this.props.verified == "TRUE" ?
                     (<button className="btn btn-outline btn btn-success btn-sm">Verified</button>) :
                (                <button className="btn btn btn-danger btn-sm">Not Verified</button>)
                }

				
            </div>      
            
		)
    }
});
