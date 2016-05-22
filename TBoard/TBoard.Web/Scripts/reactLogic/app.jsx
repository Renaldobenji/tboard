var login = React.createClass({

  registerClick: function(event) {
		routie('register');
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
										<a className="btn btn-lg btn-success btn-block">Login</a>
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

/*Register Page*/
var RegisterType = React.createClass({	
	render: function(){
		return (			
				<div className="panel panel-primary">
					<div className="panel-heading">
						Registration Type
					</div>
					<div className="panel-body">
						<form role="form">
							<div className="form-group">
								<div className="radio">
									<label>
										<input type="radio" name="registrationOptions" id="registrationOptionsPrivateBuyer" value="Private Buyer" checked/> Private Buyer
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" name="registrationOptions" id="registrationOptionsCorporateBuyer" value="Corporate Buyer"/> Corporate Buyer
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" name="registrationOptions" id="registrationCorporateSeller" value="Corporate Seller"/> Corporate Seller
									</label>
								</div>
							</div>
						</form>
					</div>						
				</div>				
		);
	}
});

/*Register Page*/
var Register = React.createClass({	
	render: function(){
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<RegisterType />
					</div>					
					<div className="col-md-8">
						<RegisterPrivate />
						<RegisterContactDetails />
						<RegisterAddress />						
					</div>
				</div>							
			</div>
		);
	}
});


var RegisterPrivate = React.createClass({	
	render: function(){
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					Private Buyer
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
                            <label>Name</label>
                            <input id="Name" className="form-control" placeholder="Name"/>
                        </div>
						<div className="form-group">
                            <label>Surname</label>
                            <input id="Surname" className="form-control" placeholder="Surname"/>
                        </div>
						<div className="form-group">
                            <label>Password</label>
                            <input id="Password" className="form-control" placeholder="Password"/>
                        </div>
						<div className="form-group">
                            <label>Confirm Password</label>
                            <input id="ConfirmPassword" className="form-control" placeholder="Confirm Password"/>
                        </div>
						<div className="form-group">
                            <label>ID Number</label>
                            <input id="IDNumber" className="form-control" placeholder="ID Number"/>
                        </div>
					</form>
				</div>						
			</div>
		);
	}
});

var RegisterContactDetails = React.createClass({	
	render: function(){
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					Contact Information
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
                            <label>Cell Number</label>
                            <input id="CellNumber" className="form-control" placeholder="Cell Number"/>
                        </div>
						<div className="form-group">
                            <label>Home Number</label>
                            <input id="HomeNumber" className="form-control" placeholder="Home Number"/>
                        </div>
						<div className="form-group">
                            <label>Work Number</label>
                            <input id="WorkNumber" className="form-control" placeholder="Work Number"/>
                        </div>
						<div className="form-group">
                            <label>Email</label>
                            <input id="Email" className="form-control" placeholder="Email"/>
                        </div>						
					</form>
				</div>						
			</div>
		);
	}
});

var RegisterAddress = React.createClass({	
	render: function(){
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					Address Information
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
                            <label>Address Line 1</label>
                            <input id="AddressLine1" className="form-control" placeholder="Address Line 1"/>
                        </div>
						<div className="form-group">
                            <label>Address Line 2</label>
                            <input id="AddressLine2" className="form-control" placeholder="Address Line 2"/>
                        </div>
						<div className="form-group">
                            <label>Address Line 3</label>
                            <input id="AddressLine3" className="form-control" placeholder="Address Line 3"/>
                        </div>
						<div className="form-group">
                            <label>Address Line 4</label>
                            <input id="AddressLine4" className="form-control" placeholder="Address Line 4"/>
                        </div>
						<div className="form-group">
                            <label>Address Line 5</label>
                            <input id="AddressLine5" className="form-control" placeholder="Address Line 5"/>
                        </div>
						<div className="form-group">
                            <label>Postal Code</label>
                            <input id="PostalCode" className="form-control" placeholder="Postal Code"/>
                        </div>
					</form>
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
});