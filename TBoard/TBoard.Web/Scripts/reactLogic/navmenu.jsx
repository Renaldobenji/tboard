var NavMenu = React.createClass({

    getInitialState: function () {
        return {
            UserID: 0,
            activeRFQTotal: 0,
            activeBidsTotal: 0,
            acceptedQuotes: 0,
            OrganizationID: 0,
            bidsWonCount: 0
        };
    },

    loadData: function (userID) {
        $.ajax({
            url: 'api/RFQ/Statistics/' + userID,
            success: function (data) {
                this.setState({ activeRFQTotal: data.data.activeRFQTotal });
                this.setState({ activeBidsTotal: data.data.activeBidsTotal });
            }.bind(this)
        });

        $.ajax({
            url: 'api/RFQ/GetAcceptedBidsCount/' + userID,
            success: function (data) {
                this.setState({ acceptedQuotes: data.data });
            }.bind(this)
        });

        $.ajax({
            url: 'api/RFQ/GetBidsWonCount/' + userID,
            success: function (data) {
                this.setState({ bidsWonCount: data.data });
            }.bind(this)
        });
    },

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ UserID: decodedToken.UserID });
        this.setState({ OrganizationID: decodedToken.OrganizationID });
        this.loadData(decodedToken.UserID);
    },

	render: function(){
		return (			
				<div className="navbar-default sidebar" role="navigation">
                    <div className="sidebar-nav navbar-collapse">
                        <ul className="nav in" id="side-menu">
                            <li>
                                <a href="#dashboard" className="active"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                            </li>
                            <li>
	                            <a><i className="fa fa-bar-chart-o fa-fw"></i> Organization<span className="fa arrow"></span></a>
	                            <ul className="nav nav-second-level">
		                            <li>
			                            <a href="#organization">Details</a>
		                            </li>
		                            <li>
			                            <a href="#document">Documents</a>
		                            </li>
		                            <li>
			                            <a href="#users">Users</a>
		                            </li>
	                            </ul>	
                            </li>
                            <li>
	                            <a><i className="fa fa-bar-chart-o fa-fw"></i> Quotation<span className="fa arrow"></span></a>
	                            <ul className="nav nav-second-level">
		                            <li>
			                            <a href="#rfqrequest">Request</a>
		                            </li>	
                                    <li>
			                            <a href="#rfqmyrequest">Active Requests <span className="menuCircle">{this.state.activeRFQTotal}</span></a>
                                    </li>	
                                    <li>
			                            <a href="#rfqallrequest">All Requests</a>
                                    </li> 
                                    <li>
			                            <a href="#myacceptedquotes">Accepted Quotes <span className="menuCircle">{this.state.acceptedQuotes}</span></a>
                                    </li>   
                                    <li>
			                            <a href="#rfqmyactivebids">My Bids <span className="menuCircle">{this.state.activeBidsTotal}</span></a>
                                    </li>   
                                     <li>
			                            <a href="#bidswon">Bids Won <span className="menuCircle">{this.state.bidsWonCount}</span></a>
                                     </li>                                                               
	                            </ul>
                            </li>
                        </ul>
                    </div>                
                </div>
            )
	}
});