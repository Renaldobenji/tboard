var NavHeader = React.createClass({

    logout:function(){
        var tokens = new TboardJWTToken();
        var result = tokens.logout();
        routie('');
    },

	render: function(){
		return (	
                    <div>
                        <div className="navbar-header">
		                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			                    <span className="sr-only">Toggle navigation</span>
			                    <span className="icon-bar"></span>
			                    <span className="icon-bar"></span>
			                    <span className="icon-bar"></span>
		                    </button>		                    
                            <img className="dashboardLogo" src="../../Images/logos/icon.png" height="45px" width="45px"/>
	                    </div>

                        <ul className="nav navbar-top-links navbar-right">                
		                    <li className="dropdown">
			                    <a className="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
				                    <i className="fa fa-user fa-fw"></i>  <i className="fa fa-caret-down"></i>
			                    </a>
			                    <ul className="dropdown-menu dropdown-user">
				                    <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
				                    </li>
				                    <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
				                    </li>
				                    <li className="divider"></li>
				                    <li><a onClick={this.logout}><i className="fa fa-sign-out fa-fw"></i> Logout</a>
				                    </li>
			                    </ul>			
		                    </li>		
	                    </ul>
                    </div>
            )
	}
});