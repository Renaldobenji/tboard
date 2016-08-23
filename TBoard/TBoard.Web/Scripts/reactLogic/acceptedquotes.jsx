var MyAcceptedQuotes = React.createClass({
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
			                        <h1 className="page-header">Accepted Quotes</h1>                                   
		                        </div>                
	                        </div>  
                            <div className="row">
                                <MyAcceptedQuotesList UserID={this.state.UserID} />
                            </div>
                    </div>
                </div>                      
            )
	}
});

var MyAcceptedQuotesList = React.createClass({   
    

    getInitialState: function () {
        return { data: [] }
    },

    loadData: function () {
        $.ajax({           
            url: 'api/RFQ/GetAcceptedQuotes/' + this.props.UserID,
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
            return <ActionsRFQBID reference={row.reference}/>;
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
