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
			                            <a href="#organization">Documents</a>
		                            </li>
		                            <li>
			                            <a href="#users">Users</a>
		                            </li>
	                            </ul>	
                            </li>
                        </ul>
                    </div>                
                </div>
            )
	}
});