var MyActiveBids = React.createClass({
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
			                        <h1 className="page-header">My Bids</h1>                                   
		                        </div>                
	                        </div>  
                            <div className="row">
                                <MyActiveBidsList UserID={this.state.UserID} />
                            </div>
                    </div>
                </div>                      
            )
	}
});

var MyActiveBidsList = React.createClass({   
    

    getInitialState: function () {
        return { data: [] }
    },

    loadData: function () {
        $.ajax({           
            url: 'api/RFQ/MyActiveBids/' + this.props.UserID,
            success: function (data) {
                this.setState({ data: data.data.activeBids });
            }.bind(this)
        })
    },

    componentWillMount: function () {
        this.loadData();
    },

    render: function () {

        function actionsFormatter(cell, row) {
            return <ActionsRFQBID reference={row.rfqReference}/>;
        }

        return (
			<div className="col-lg-12">
				<BootstrapTable data={this.state.data} striped={true} hover={true} pagination={true} search={true}>
                  <TableHeaderColumn isKey={true} dataField="rfqReference" dataSort={true}>rfqReference</TableHeaderColumn>
                  <TableHeaderColumn dataField="createdDate" dataSort={true}>createdDate</TableHeaderColumn>
                  <TableHeaderColumn dataField="supplyTime" dataSort={true}>supplyTime</TableHeaderColumn>
                  <TableHeaderColumn dataField="deliveryTime" dataSort={true}>deliveryTime</TableHeaderColumn>
                  <TableHeaderColumn dataField="amount" dataSort={true}>amount</TableHeaderColumn>                  
                  <TableHeaderColumn dataFormat={actionsFormatter}>View</TableHeaderColumn>
				</BootstrapTable>
			</div>
		)
    }
});

var ActionsRFQBID = React.createClass({
    
    handleClick: function () {
        // Explicitly focus the text input using the raw DOM API.
        //alert(this.props.reference);
        routie('rfqbid/' + this.props.reference);
    },

    render: function () { 

        return (
				 <button className="btn btn-outline btn-warning btn-sm" onClick={this.handleClick}>View</button>
		)
}
});
