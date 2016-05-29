var login = React.createClass({

  registerClick: function(event) {
		routie('register');
	},
  
  loginClick: function(event) {
		routie('dashboard');
	},

  render: function() {
    return (
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-md-offset-4">
						<div className="login-panel panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Please Sign In</h3>
							</div>
							<div className="panel-body">
								<form role="form">
									<fieldset>
										<div className="form-group">
											<input className="form-control" placeholder="E-mail" name="email" type="email" autofocus/>
										</div>
										<div className="form-group">
											<input className="form-control" placeholder="Password" name="password" type="password"/>
										</div>																	
										<a onClick={this.loginClick} className="btn btn-lg btn-success btn-block">Login</a>
										<hr/>
										<a onClick={this.registerClick} className="btn btn-outline btn-default btn-block">Register</a>
									</fieldset>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>      
    );
  }
});



routie({
		'': function(){
			ReactDOM.render(
				React.createElement(login, null), document.getElementById('container')
			);
		},
		'register': function(){
			ReactDOM.render(
				React.createElement(Register, null), document.getElementById('container')
			);
		}
        ,
        'dashboard': function(){
			ReactDOM.render(
				React.createElement(Dashboard, null), document.getElementById('container')
			);
		}
        ,
        'organization': function(){
			ReactDOM.render(
				React.createElement(Organization, null), document.getElementById('container')
			);
		}
        ,
        'users': function(){
			ReactDOM.render(
				React.createElement(UserManagement, null), document.getElementById('container')
			);
		}

});