var NavMenu = React.createClass({	
	render: function(){
		return (			
				<div className="navbar-default sidebar" role="navigation">
                    <div className="sidebar-nav navbar-collapse">
                        <ul className="nav in" id="side-menu">
                            <li>
                                <a href="#dashboard" className="active"><i className="fa fa-dashboard fa-fw"></i> Dashboard</a>
                            </li>
                        </ul>
                    </div>                
                </div>
            )
	}
});