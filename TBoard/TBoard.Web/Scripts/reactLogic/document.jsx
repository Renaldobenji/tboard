/*Register Page*/
var DocumentManagement = React.createClass({
    	
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
                                    </h1>
		                        </div>
	                        </div>
                            <div className="row">
                                <div className="col-lg-8">
			                        <DocumentList />
		                        </div>
		                        <div className="col-lg-4">
			                        <DocumentRequirements />
		                        </div>
	                        </div>
                        </div>
                    </div>  
                
		);
	}
});


/*Register Page*/
var DocumentRequirements = React.createClass({

    getInitialState: function() {
        return {
            MissingRequirements: []
        };
    },

    fetchMissingRequirements: function(orgID) {
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
        this.fetchMissingRequirements(1);
    },
    	
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
                                    {this.state.MissingRequirements.map(function(obj){
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

    getInitialState: function() {
			return {
                        OrganizationID : 1
					};

	},

    componentDidMount: function() {

        $('#documentTable').DataTable( {
            ajax: {
                    "url": 'api/Document/1'
                }
                ,"columns": [
                                { "data": "documentTypeCode" },
                                { "data": "documentDescription" },
                                { "data": "dateCreated" }
                            ]
        } );
    },
    	
	render: function(){
        var navBarSyle= {
              marginBottom:0
            };
	    
        
		return (
	            <table id="documentTable" className="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" width="100%" role="grid">
                    <thead>
                        <tr>
                            <th>Document Type Code</th>
                            <th>Document Description</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                </table>
		);
	}
});
