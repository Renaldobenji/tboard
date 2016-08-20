var Dashboard = React.createClass({

    getInitialState: function () {
        return {
            UserID: 0,
            activeRFQTotal: 0,
            activeBidsTotal: 0,
            OrganizationID : 0
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
    },

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ UserID: decodedToken.UserID });
        this.setState({ OrganizationID: decodedToken.OrganizationID });
        this.loadData(decodedToken.UserID);
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
			                        <h1 className="page-header">Dashboard</h1>
		                        </div>                
	                        </div>  
                            <div className="row">
		                        <div className="col-lg-12">
			                        <h3 className="page-header">Profile</h3>
		                        </div>
                            </div>  
                            <div className="row">
		                        <div className="col-md-3">
			                        <OrganizationCompleteness UserID={this.state.UserID} OrganizationID={this.state.OrganizationID} />
		                        </div>
                            </div>  
                            <div className="row">
		                        <div className="col-lg-12">
			                        <h3 className="page-header">Quotation Information</h3>
		                        </div>
                            </div>  
                            <div className="row">
		                        <div className="col-md-3">
			                        <RFQActiveStatistics activeRFQTotal={this.state.activeRFQTotal}/>
		                        </div>
                                <div className="col-md-3">
			                        <RFQActiveBidsStatistics activeBidsTotal={this.state.activeBidsTotal}/>
                                </div>
                                <div className="col-md-3">
			                        <RFQCreateDashboard activeBidsTotal={this.state.activeBidsTotal} />
                                </div>                                
                            </div>   
                    </div>
                </div>

                      
            )
	}
});

var RFQActiveStatistics = React.createClass({

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                <div>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className="fa fa-comments fa-5x"></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="huge">{this.props.activeRFQTotal}</div>
                                    <div>Active Requests!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#rfqmyrequest">
                            <div className="panel-footer">
                                <span className="pull-left">View Details</span>
                                <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                <div className="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
            )
}
});

var RFQActiveBidsStatistics = React.createClass({

    Navigate : function(){
        routie('rfqmyrequest');
    },

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                  <div>                    
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className="fa fa-comments fa-5x"></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="huge">{this.props.activeBidsTotal}</div>
                                    <div>Pending Bids!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#rfqmyactivebids">
                            <div className="panel-footer">
                                <span className="pull-left">View Details</span>
                                <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                <div className="clearfix"></div>
                            </div>
                        </a>
                    </div>                       
                    </div>
            )
}
});


var RFQCreateDashboard = React.createClass({

    Navigate : function(){
        routie('rfqrequest');
    },

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                  <div>                    
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className="fa fa-comments fa-5x"></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="huge">Create</div>
                                    <div>Request</div>
                                </div>
                            </div>
                        </div>
                        <a href="#rfqrequest">
                            <div className="panel-footer">
                                <span className="pull-left">Create</span>
                                <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                <div className="clearfix"></div>
                            </div>
                        </a>
                    </div>                       
                    </div>
            )
}
});

var OrganizationCompleteness = React.createClass({

    getInitialState: function () {
        return {
            OrganizationCompleteness: 0,
            UserCompleteness: 0            
        };
    },

    loadData: function (orgID, userID) {
        $.ajax({
            url: 'api/User/OrganizationCompleteness/' + orgID,
            success: function (data) {
                this.setState({ OrganizationCompleteness: data.data });
            }.bind(this)
        });
        $.ajax({
            url: 'api/User/ProfileCompleteness/' + orgID,
            success: function (data) {
                this.setState({ UserCompleteness: data.data });
            }.bind(this)
        });
    },

    componentWillMount: function () {
        this.loadData(this.props.OrganizationID, this.props.UserID);
    },

    render: function() {

        var navBarSyleOrg= {
            width: this.state.OrganizationCompleteness + "%"
        };

        var navBarSyleUser = {
            width: this.state.UserCompleteness + "%"
        };

        return (
                  <div> 
                       <div className="panel panel-info">                        
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-xs-12 text-right">
                                    <h5>My Profile</h5>
                                    <div className="progress">
                                    <div className="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={navBarSyleUser}>
                                        {this.state.UserCompleteness}% Complete
                                    </div>
                                    </div>
                                    <h5>My Organization</h5>
                                   <div className="progress">
                                    <div className="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={navBarSyleOrg}>
                                        {this.state.OrganizationCompleteness}% Complete
                                    </div>
                                   </div>
                                </div>
                            </div>
                        </div>
                        </div>       
                    </div>
            )
}
});