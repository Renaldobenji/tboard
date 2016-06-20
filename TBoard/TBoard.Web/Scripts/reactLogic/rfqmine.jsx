var MyRFQ = React.createClass({
    getInitialState: function () {
        return {
            UserID: 1
        };

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
			                        <h1 className="page-header">My Requests</h1>                                   
		                        </div>                
	                        </div>  
                            <div className="row">
                                <ActiveRequestList UserID={this.state.UserID} />
                            </div>
                    </div>
                </div>                      
            )
	}
});

/*Register Page
var ActiveRequestList = React.createClass({    

    handleClick: function () {
        // Explicitly focus the text input using the raw DOM API.
        alert("sdfasdf");
    },

    componentDidMount: function () {
        $('#activeRequestTable').DataTable( {
            ajax: {
                "url": 'api/RFQ/Active/' + this.props.UserID
            },
            'columnDefs': [{
                'targets': 7,
                'searchable':false,
                'orderable':false,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta){
                     return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
                    return '<button class="btn btn-outline btn-warning btn-sm">View</button>';
                }
                }]
                ,"columns": [
                                { "data": "reference" },
                                { "data": "userName" },
                                { "data": "expertise" },
                                { "data": "rfqDetails" },
                                { "data": "rfqType" },
                                { "data": "expiryDate" },
                                { "data": "createdDate" },
                                { "data": "actions" }
                            ]
        }
        

        );
    },
    
    render: function(){
        var navBarSyle= {
            marginBottom:0
        };	    
       
        return (
	                <div className="col-lg-12">
			            <table id="activeRequestTable" className="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" width="100%" role="grid">
                            <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>User</th>
                                    <th>Expertise</th>
                                    <th>Details</th>
                                    <th>Type</th>
                                    <th>Expiry Date</th>
                                    <th>Created Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                        </table>
		            </div>
                
		);
    }
});*/

var ActiveRequestList = React.createClass({

    getInitialState: function () {
        return { data: [] }
    },

    loadData: function () {
        $.ajax({
            url: 'api/RFQ/Active/' + this.props.UserID,
            success: function (data) {
                this.setState({ data: data.data });
            }.bind(this)
        })
    },

    componentWillMount: function () {
        this.loadData();
    },   
    
    render: function () {      

        function actionsFormatter(cell, row) {
            return <Actions reference={row.reference}/>;
        }

        return (
			<div className="col-lg-12">	
				<BootstrapTable data={this.state.data} striped={true} hover={true} pagination={true} search={true}>
                  <TableHeaderColumn isKey={true} dataField="reference">Reference</TableHeaderColumn>
                  <TableHeaderColumn dataField="userName">User</TableHeaderColumn>
                  <TableHeaderColumn dataField="expertise">Expertise</TableHeaderColumn>
                  <TableHeaderColumn dataField="rfqDetails">Details</TableHeaderColumn>
                  <TableHeaderColumn dataField="rfqType">Type</TableHeaderColumn>
                  <TableHeaderColumn dataField="expiryDate" dataSort={true}>Expiry Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="createdDate" dataSort={true}>Created Date</TableHeaderColumn>    
                  <TableHeaderColumn dataFormat={actionsFormatter}>Actions</TableHeaderColumn>                
				</BootstrapTable>				
			</div>
		)
    }
});

var Actions = React.createClass({
    
    handleClick: function () {
        // Explicitly focus the text input using the raw DOM API.
        //alert(this.props.reference);
        routie('rfqdetail/' + this.props.reference);
    },

    render: function () { 

        return (
				 <button className="btn btn-outline btn-warning btn-sm" onClick={this.handleClick}>View</button>
		)
    }
});
