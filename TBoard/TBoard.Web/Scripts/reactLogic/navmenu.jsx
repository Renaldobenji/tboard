var NavMenu = React.createClass({	
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
			                            <a href="#rfqmyrequest">Active Requests <span className="menuCircle">2</span></a>
                                    </li>	
                                    <li>
			                            <a href="#rfqallrequest">All Requests <span className="menuCircle">4</span></a>
                                    </li> 
                                    <li>
			                            <a href="#myacceptedquotes">Accepted Quotes <span className="menuCircle">6</span></a>
                                    </li>   
                                    <li>
			                            <a href="#rfqmyactivebids">My Bids <span className="menuCircle">1</span></a>
                                    </li>   
                                     <li>
			                            <a href="#bidswon">Bids Won <span className="menuCircle">6</span></a>
                                     </li>                                                               
	                            </ul>
                            </li>
                        </ul>
                    </div>                
                </div>
            )
	}
});