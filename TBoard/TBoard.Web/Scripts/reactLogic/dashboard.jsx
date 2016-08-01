var Dashboard = React.createClass({

    getInitialState: function () {
        return {
            UserID: 0,
            activeRFQTotal: 0,
            activeBidsTotal: 0
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
		                        <div className="col-lg-3 col-md-6">
			                        <RFQActiveStatistics activeRFQTotal={this.state.activeRFQTotal}/>
		                        </div>
                                <div className="col-lg-3 col-md-6">
			                        <RFQActiveBidsStatistics activeBidsTotal={this.state.activeBidsTotal}/>
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