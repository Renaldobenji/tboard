var BidsWon = React.createClass({
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
			                        <h1 className="page-header">Bids Won</h1>                                   
		                        </div>                
	                        </div> 
                            <div className="row">
                                <div className="panel panel-info">
                                    <div className="panel-heading">
                                        Bids Won
                                    </div>
                                    <div className="panel-body">
                                        <h4 className="text-success">Congratulations</h4>
                                        <p>You have successfully tendered for a quote, please await further instruction.</p>
                                        <p>Regards</p>
                                        <p>TenderBoard Team</p>
                                    </div>                                    
                                </div>
                            </div> 
                            <div className="row">
                                <MyBidWonList UserID={this.state.UserID} />
                            </div>
                    </div>
                </div>                      
            )
	}
});

var MyBidWonList = React.createClass({   
    

    getInitialState: function () {
        return { data: [] }
    },

    loadData: function () {
        $.ajax({           
            url: 'api/RFQ/GetBidsWon/' + this.props.UserID,
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
            return <ActionsRFQPay reference={row.reference}/>;
        }

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

var ActionsRFQPay = React.createClass({
    
    handleClick: function () {
        // Explicitly focus the text input using the raw DOM API.
        //alert(this.props.reference);
        //routie('rfqdetail/' + this.props.reference);
    },

    render: function () { 

        return (
				 <button className="btn btn-outline btn-warning btn-sm" onClick={this.handleClick}>View</button>
		)
}
});
