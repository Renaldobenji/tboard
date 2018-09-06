var NavMenu = React.createClass({

    getInitialState: function () {
        return {
            UserID: 0,
            activeRFQTotal: 0,
            activeBidsTotal: 0,
            acceptedQuotes: 0,
            OrganizationID: 0,
            bidsWonCount: 0,
            roles: []
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
        var loggedIn = tokens.IsLoggedIn();
        if (loggedIn == true) {
            var decodedToken = tokens.getJWTToken();
            this.setState({ UserID: decodedToken.UserID });
            this.setState({ OrganizationID: decodedToken.OrganizationID });
            this.setState({ roles: decodedToken.role });
            this.loadData(decodedToken.UserID);
        }       
    },

	render: function(){
		return (			
				<div className="navbar-default sidebar" role="navigation">
                    <div className="sidebar-nav navbar-collapse">
                        <ul className="nav in" id="side-menu">
                            <li>
                                <a href="#dashboard" className="active"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                            </li>
                            { this.state.roles.indexOf("CanViewOrganizationMenu") > -1 || this.state.roles.indexOf("CorporateBuyer") > -1 || this.state.roles.indexOf("CorporateSeller") > -1 ? <OrganizationMenu/> : null }
                            { this.state.roles.indexOf("CanViewPersonalMenu") > -1 || this.state.roles.indexOf("PrivateBuyer") > -1  ?  <PersonalMenu /> : null }   
                             <li>
                                 <a><i className="fa fa-bar-chart-o fa-fw"></i> Orders<span className="fa arrow"></span></a>
                                 <ul className="nav nav-second-level">                                 
                                  <li>
			                            <a href="#rfqrequest">Request For Quote</a>
                                  </li>
                                 <li>
			                           <a href="#rfqmyrequest">Pending Orders <span className="menuCircle">{this.state.activeRFQTotal}</span></a>
                                 </li>
                                <li>
			                            <a href="#myacceptedquotes">Accepted Orders <span className="menuCircle">{this.state.acceptedQuotes}</span></a>
                                </li>
                                <li>
			                            <a href="#rfqallrequest">All Orders</a>
                                </li>
                                </ul>
                            </li>
                            { this.state.roles.indexOf("CanViewBidsMenu") > -1 || this.state.roles.indexOf("CorporateSeller") > -1  ?
                            <MyBidsMenu activeBidsTotal={this.state.activeBidsTotal}  bidsWonCount={this.state.bidsWonCount}/> : null }    
                            <ReportsMenu />                       
                        </ul>
                    </div>                
                </div>
            )
	}
});

var MyBidsMenu = React.createClass({

   
    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
              <li>
	            <a><i className="fa fa-bar-chart-o fa-fw"></i> My Bids<span className="fa arrow"></span></a>
	            <ul className="nav nav-second-level">
                    <li>
			            <a href="#rfqmyactivebids">Bids <span className="menuCircle">{this.props.activeBidsTotal}</span></a>
                    </li>   
                    <li>
			        <a href="#bidswon">Bids Won <span className="menuCircle">{this.props.bidsWonCount}</span></a>
                    </li> 
                    <li>
			        <a href="#bidslost">Bids Lost</a>
                    </li>                                                                                
	            </ul>
            </li>
            )
}
});

var OrganizationMenu = React.createClass({

   
    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
               <li>
	                <a><i className="fa fa-bar-chart-o fa-fw"></i> Organization<span className="fa arrow"></span></a>
	                <ul className="nav nav-second-level">
                        <li>
			                <a href="#orgCreate">Create</a>
                        </li>
		                <li>
			                <a href="#organization">Details</a>
                            <ul className="nav nav-third-level collapse in" aria-expanded="true">
                                <li>
                                    <a href="#OrgInfo">Organization Information</a>
                                </li>                                
                            </ul>
                            <ul className="nav nav-third-level collapse in" aria-expanded="true">
                                <li>
                                    <a href="#FinanceInfo">Finance Information</a>
                                </li>
                            </ul>
		                </li>
		                <li>
			                <a href="#document">Documents</a>
		                </li>
		                <li>
			                <a href="#users">Users</a>
		                </li>                         
	                </ul>
                </li>
            )
}
});

var PersonalMenu = React.createClass({

   
    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
               <li>
	                <a><i className="fa fa-bar-chart-o fa-fw"></i> Person Details<span className="fa arrow"></span></a>
	                <ul className="nav nav-second-level">
		                <li>
			                <a href="#personalDetails">Details</a>
		                </li>		                
	                </ul>
                </li>
            )
}
});

var ReportsMenu = React.createClass({

   
    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
               <li>
	                <a><i className="fa fa-bar-chart-o fa-fw"></i>Reports<span className="fa arrow"></span></a>
	                <ul className="nav nav-second-level">
		                <li>
			                <a href="#report">Expenditure</a>
		                </li>                                         
	                </ul>
                </li>
            )
}
});