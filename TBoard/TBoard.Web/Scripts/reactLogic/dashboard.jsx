﻿var Dashboard = React.createClass({

    getInitialState: function () {
        return {
            UserID: 0,
            activeRFQTotal: 0,
            activeBidsTotal: 0,
            acceptedQuotes: 0,
            OrganizationID: 0,
            OrganizationName: "",
            Verified: 0,
            bidsWonCount: 0,
            UserOrg: [],
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

        $.ajax({
            url: 'api/Organization/GetUserOrganizations/' + userID,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ UserOrg: data.data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Organization/GetUserOrganizations/', status, err.toString());
            }.bind(this)
        });
    },

    startWithAutoIncrement: function () {
        this.setState({
            percent: 0,
            autoIncrement: true,
            intervalTime: (Math.random() * 1000)
        });
    },

    stopWithAutoIncrement: function () {
        this.setState({
            percent: 0,
            autoIncrement: false,
            intervalTime: (Math.random() * 1000)
        });
    },

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ UserID: decodedToken.UserID });
        this.setState({ OrganizationID: decodedToken.OrganizationID });
        this.setState({ Verified: decodedToken.Verified });
        this.setState({ OrganizationName: decodedToken.OrganizationName });
        this.loadData(decodedToken.UserID);
    },

    componentDidUpdate: function() {
        $("#switchCompanyDiv").toggle();
    },

    updateOrganizationID: function (e) {

        var filtered = this.state.UserOrg.filter(function (el) {
            return el.Name === e.target.value;
        });

        var orgKey = filtered[0].Key;
        this.setState({ OrganizationID: orgKey });
        console.log(this.state.OrganizationID);

        this.startWithAutoIncrement();
        $.ajax({
            url: 'api/Authentication/SwitchCompany/' + this.state.UserID + '/' + orgKey,
            dataType: 'json',
            cache: false,
            success: function (result) {
                this.stopWithAutoIncrement();
                if (result.authenicated == "true") {                   
                    var sa = new TboardJWTToken();
                    sa.store(result.data);
                    location.reload();
                }
                else {
                    alert(result.errorMessage);
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Authentication/', status, err.toString());
            }.bind(this)
        });      

    },

	render: function() {

        var navBarSyle= {
              marginBottom:0
        };

        var hideCompanies = {
         
        };

        let optionItems = this.state.UserOrg.map((planet) =>
            <option key={planet.Key }>{planet.Name}</option>
            );

        var tripToShowNavigation = new Trip([
                                  { sel: $("#UserProfileStats"), content: "This gives you an idea in percentage of how complete your profile is with us!", position: "n" },
                                  { sel: $("#RFQActiveStatisticsTour"), content: "Details and count of your current active requests.", position: "n", expose: true },
                                  { sel: $("#BidsActiveStatisticsTour"), content: "Details and count of your current quotes.", position: "n", expose: true },
                                  { sel: $("#AcceptedQuotesStatisticsTour"), content: "Details and count of your current accepted quotes.", position: "n", expose: true },
                                  { sel: $("#BidsWonStatisticsTour"), content: "Congratulations, your bid on a request has been accepted, you can view your details here.", position: "n", expose: true },
                                  { sel: $("#CreateRFQStatisticsTour"), content: "You are now ready to start create requests, go ahead and enjoy.", position: "n", expose: true }
                                        ], {
                                            showNavigation: true,
                                            showCloseBox: true,
                                            delay: -1
                                        });      

        $("#tourbutton").on("click", function () {
            tripToShowNavigation.start();
        });


		return (	
                <div>		
				    <nav className="navbar navbar-default navbar-static-top" role="navigation" style={navBarSyle}>
	                    <NavHeader />
                        <NavMenu />
                    </nav>
                    <div id="page-wrapper">
	                        <div className="row">
		                        <div className="col-lg-12">
			                        <h1 className="page-header"><img src="../../Images/logos/Logo 02.png" height="70px" width="450px" />&nbsp;&nbsp;
                                        { this.state.OrganizationName != "" ?
			                               ( this.state.OrganizationName
			                               ) : ""}
                                        
                                        {this.state.Verified == "True"? (
                                        <img alt="Verified" src="../../Images/Verify.png" height="70px" width="70px" />) : ""}
                                    
                                        &nbsp;&nbsp;
                                    <button id="switchCompany" type="button" className="btn btn-outline btn-default" data-toggle="modal" data-target="#changeCompanyModal">Switch Company</button>
                                        &nbsp;&nbsp;
                                    <button id="tourbutton" type="button" className="btn btn-outline btn-default">Take a Tour</button>
                                   
                                       
                                    </h1>
		                        </div>                
	                        </div>  
                            <div className="row">
		                        <div className="col-lg-12">
			                        <h3 className="page-header">Profile </h3>                 
		                        </div>                               
                            </div>  
                            <div className="row">
		                        <div className="col-md-3" id="UserProfileStats">
			                        <OrganizationCompleteness UserID={this.state.UserID} OrganizationID={this.state.OrganizationID} />
		                        </div>
                            </div>  
                            <div className="row">
		                        <div className="col-lg-12">
			                        <h3 className="page-header">Quotation Information</h3>
		                        </div>
                            </div>  
                            <div className="row">
		                        <div className="col-md-3" id="RFQActiveStatisticsTour">
			                        <RFQActiveStatistics activeRFQTotal={this.state.activeRFQTotal}/>
		                        </div>
                                <div className="col-md-3" id="BidsActiveStatisticsTour">
			                        <RFQActiveBidsStatistics activeBidsTotal={this.state.activeBidsTotal}/>
                                </div>
                                <div className="col-md-3" id="AcceptedQuotesStatisticsTour">
			                        <RFQAcceptedQuotes acceptedQuotes={this.state.acceptedQuotes} />
                                </div>                                
                                <div className="col-md-3" id="CreateRFQStatisticsTour">
			                        <RFQCreateDashboard activeBidsTotal={this.state.activeBidsTotal} />
                                </div>                                
                            </div>  
                            <div className="row">
		                        <div className="col-md-3" id="BidsWonStatisticsTour">
			                        <BidsWonCountStatistics bidsWonCount={this.state.bidsWonCount} />
		                        </div>                               
                            </div> 
                    </div>

                    <div className="modal fade" id="changeCompanyModal" tabindex="-1" role="dialog" aria-labelledby="changeCompanyModal" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h4 className="modal-title" id="myModalLabel">Switch Company</h4>                                    
								</div>
								<div className="modal-body">
                                    <form role="form">
                                        <div>
                                         <select className="form-control" onChange={this.updateOrganizationID}>{optionItems}
                                         </select>
                                        </div>
                                    </form>
								</div>								
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

var RFQAcceptedQuotes = React.createClass({   

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
                                    <div className="huge">{this.props.acceptedQuotes}</div>
                                    <div>Accepted Quotes!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#myacceptedquotes">
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

var BidsWonCountStatistics = React.createClass({   

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
                                    <div className="huge">{this.props.bidsWonCount}</div>
                                    <div>Bids Won!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#bidswon">
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


var CommingSoon = React.createClass({

    Navigate : function(){
        routie('rfqrequest');
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
                    <div id="page-wrapper" >  
                        <div className="vertical-center">
                            <div className="row">
		                    <div className="col-lg-12">
			                    <div className="alert alert-info jumbotron"><h1 className="text-center">Coming Soon</h1></div>
		                    </div>
                            </div>
                        </div>                     
	                    
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
            url: 'api/User/ProfileCompleteness/' + userID,
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