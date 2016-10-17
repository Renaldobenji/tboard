var BidsLost = React.createClass({
    getInitialState: function () {
        return {
            UserID: ""
        };

    },

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ UserID: decodedToken.UserID });
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
			                        <h1 className="page-header">Bids Lost</h1>                                   
		                        </div>                
	                        </div> 
                            <div className="row">
                                <div className="panel panel-info">
                                    <div className="panel-heading">
                                        Bids Lost
                                    </div>
                                    <div className="panel-body">
                                        <h4 className="text-danger">Sorry</h4>
                                        <p>You following quote applications have been unsuccessful</p>
                                        <p>Regards</p>
                                        <p>TenderBoard Team</p>
                                    </div>                                    
                                </div>
                            </div> 
                            <div className="row">
                                <MyBidLostList UserID={this.state.UserID} />
                            </div>
                    </div>
                </div>                      
            )
	}
});

var MyBidLostList = React.createClass({

    getInitialState: function () {
        return { data: [] }
    },

    loadData: function () {
        $.ajax({           
            url: 'api/RFQ/GetBidsLost/' + this.props.UserID,
            success: function (data) {
                this.setState({ data: data.data });
            }.bind(this)
        })
    },

    componentWillMount: function () {
        this.loadData();
    },

    render: function () {

        return (
			<div className="col-lg-12">
				<BootstrapTable data={this.state.data} striped={true} hover={true} pagination={true} search={true}>
                  <TableHeaderColumn isKey={true} dataField="reference" dataSort={true}>reference</TableHeaderColumn>
                  <TableHeaderColumn dataField="quoteStatusDateTime" dataSort={true}>quoteStatusDateTime</TableHeaderColumn>
                  <TableHeaderColumn dataField="name" dataSort={true}>name</TableHeaderColumn>                  
                  <TableHeaderColumn dataField="dateCreated" dataSort={true}>dateCreated</TableHeaderColumn> 
                  <TableHeaderColumn dataField="amount" dataSort={true}>amount</TableHeaderColumn>
                  <TableHeaderColumn dataField="deliveryTime" dataSort={true}>deliveryTime</TableHeaderColumn>     
                  <TableHeaderColumn dataField="supplyTime" dataSort={true}>supplyTime</TableHeaderColumn>
				</BootstrapTable>
			</div>
		)
    }
});