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
										<input type="radio" name="registrationOptions" id="registrationOptionsPrivateBuyer" value="PrivateBuyer" onChange={this.props.updateRegistrationTypeState}/> Private Buyer
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" name="registrationOptions" id="registrationOptionsCorporateBuyer" value="CorporateBuyer" onChange={this.props.updateRegistrationTypeState}/> Corporate Buyer
									</label>
								</div>
								<div className="radio">
									<label>
										<input type="radio" name="registrationOptions" id="registrationCorporateSeller" value="CorporateSeller" onChange={this.props.updateRegistrationTypeState}/> Corporate Seller
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
var RegisterComplete = React.createClass({	
	render: function(){
		return (			
			<button type="button" className="btn btn-success btn-lg btn-block">Complete</button>		
		);
	}
});

/*Register Page*/
var Register = React.createClass({	
	getInitialState: function() {
			return {
						regChecked : true,
						RegistrationType : '',
						Name : '',
						Surname : '',
						Password : '',
						ConfirmPassword : '',
						IDNumber : '',
						OrganizationName : '',
						CellNumber : '',
						HomeNumber : '',
						OfficeNumber : '',
						Email : '',
						AddressLine1 : '',
						AddressLine2 : '',
						AddressLine3 : '',
						AddressLine4 : '',
						AddressLine5 : '',
						PostalCode : ''
					};

	},
		
	updateRegistrationTypeState : function(e){
		this.setState({RegistrationType : e.currentTarget.value});	
		console.log(this.state.RegistrationType);	
	},
	updateNameState : function(e){
		this.setState({Name : e.target.value});		
	},
	updateSurnameState : function(e){
		this.setState({Surname : e.target.value});		
	},
	updatePasswordState : function(e){
		this.setState({Password : e.target.value});		
	},
	updatePasswordConfirmState : function(e){
		this.setState({ConfirmPassword : e.target.value});		
	},
	updateIDNumberState : function(e){
		this.setState({IDNumber : e.target.value});	
		console.log(this.state.IDNumber);
	},
	updateOrgNameState : function(e){
		this.setState({OrganizationName : e.target.value});		
	},
	updateCellNumberState : function(e){
		this.setState({CellNumber : e.target.value});	
		console.log(this.state.CellNumber);			
	},
	updateHomeNumberState : function(e){
		this.setState({HomeNumber : e.target.value});		
	},
	updateOfficeNumberState : function(e){
		this.setState({OfficeNumber : e.target.value});		
	},
	updateEmailState : function(e){
		this.setState({Email : e.target.value});
		console.log(this.state.Email);		
	},
	updateAddLine1State : function(e){
		this.setState({AddressLine1 : e.target.value});		
	},
	updateAddLine2State : function(e){
		this.setState({AddressLine2 : e.target.value});		
	},
	updateAddLine3State : function(e){
		this.setState({AddressLine3 : e.target.value});	
		console.log(this.state.AddressLine3);		
	},
	updateAddLine4State : function(e){
		this.setState({AddressLine4 : e.target.value});		
	},
	updateAddLine5State : function(e){
		this.setState({AddressLine5 : e.target.value});	
		console.log(this.state.AddressLine5);		
	},
	updatePostalCodeState : function(e){
		this.setState({PostalCode : e.target.value});	
		console.log(this.state.PostalCode);		
	},

	render: function(){
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<RegisterType updateRegistrationTypeState={this.updateRegistrationTypeState} regChecked={this.state.regChecked}/>
						<RegisterComplete />
					</div>					
					<div className="col-md-8">
						<RegisterPersonal  name={this.state.Name} updateName={this.updateNameState}
										   surname={this.state.Surname} updateSurname={this.updateSurnameState}
										   password={this.state.Password} updatePassword={this.updatePasswordState}
										   confirmPassword={this.state.ConfirmPassword} updateConfirmPassword={this.updatePasswordConfirmState}
										   idNumber={this.state.IDNumber} updateIDNumber={this.updateIDNumberState}
										   orgName={this.state.OrganizationName} updateOrgName={this.updateOrgNameState}/>
						<RegisterContactDetails cellNumber={this.state.CellNumber} updateCellNumber={this.updateCellNumberState}
												homeNumber={this.state.HomeNumber} updateHomeNumber={this.updateHomeNumberState}
												officeNumber={this.state.OfficeNumber} updateOfficeNumber={this.updateOfficeNumberState}
												email={this.state.Email} updateEmail={this.updateEmailState}
												/>
						<RegisterAddress  addressLine1={this.state.AddressLine1} updateAddressLine1={this.updateAddLine1State}
										  addressLine2={this.state.AddressLine2} updateAddressLine2={this.updateAddLine2State}
										  addressLine3={this.state.AddressLine3} updateAddressLine3={this.updateAddLine3State}
										  addressLine4={this.state.AddressLine4} updateAddressLine4={this.updateAddLine4State}
										  addressLine5={this.state.AddressLine5} updateAddressLine5={this.updateAddLine5State}
										  postalCode={this.state.PostalCode} updatePostalCode={this.updatePostalCodeState} />						
					</div>
				</div>							
			</div>
		);
	}
});


var RegisterPersonal = React.createClass({	
	render: function(){
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					Personal Information
				</div>
				<div className="panel-body">
					<form>
						<div className="form-group">
                            <label>Name</label>
                            <input id="Name" className="form-control" placeholder="Name" value={this.props.name} onChange={this.props.updateName} />
                        </div>
						<div className="form-group">
                            <label>Surname</label>
                            <input id="Surname" className="form-control" placeholder="Surname" value={this.props.surname} onChange={this.props.updateSurname}/>
                        </div>
						<div className="form-group">
                            <label>Password</label>
                            <input id="Password" className="form-control" placeholder="Password" value={this.props.password} onChange={this.props.updatePassword}/>
                        </div>
						<div className="form-group">
                            <label>Confirm Password</label>
                            <input id="ConfirmPassword" className="form-control" placeholder="Confirm Password" value={this.props.confirmPassword} onChange={this.props.updateConfirmPassword}/>
                        </div>
						<div className="form-group">
                            <label>ID Number</label>
                            <input id="IDNumber" className="form-control" placeholder="ID Number" value={this.props.idNumber} onChange={this.props.updateIDNumber}/>
                        </div>
						<div className="form-group">
                            <label>*Organization Name</label>
                            <input id="CompanyName" className="form-control" placeholder="Company Name" value={this.props.orgName} onChange={this.props.updateOrgName}/>
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
                            <input id="CellNumber" className="form-control" placeholder="Cell Number" value={this.props.cellNumber} onChange={this.props.updateCellNumber}/>
                        </div>
						<div className="form-group">
                            <label>Home Number</label>
                            <input id="HomeNumber" className="form-control" placeholder="Home Number" value={this.props.homeNumber} onChange={this.props.updateHomeNumber}/>
                        </div>
						<div className="form-group">
                            <label>Office Number</label>
                            <input id="WorkNumber" className="form-control" placeholder="Work Number" value={this.props.officeNumber} onChange={this.props.updateOfficeNumber}/>
                        </div>
						<div className="form-group">
                            <label>Email</label>
                            <input id="Email" className="form-control" placeholder="Email" value={this.props.email} onChange={this.props.updateEmail}/>
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
                            <input id="AddressLine1" className="form-control" placeholder="Address Line 1" value={this.props.addressLine1} onChange={this.props.updateAddressLine1}/>
                        </div>
						<div className="form-group">
                            <label>Address Line 2</label>
                            <input id="AddressLine2" className="form-control" placeholder="Address Line 2" value={this.props.addressLine2} onChange={this.props.updateAddressLine2}/>
                        </div>
						<div className="form-group">
                            <label>Address Line 3</label>
                            <input id="AddressLine3" className="form-control" placeholder="Address Line 3" value={this.props.addressLine3} onChange={this.props.updateAddressLine3}/>
                        </div>
						<div className="form-group">
                            <label>Address Line 4</label>
                            <input id="AddressLine4" className="form-control" placeholder="Address Line 4" value={this.props.addressLine4} onChange={this.props.updateAddressLine4}/>
                        </div>
						<div className="form-group">
                            <label>Address Line 5</label>
                            <input id="AddressLine5" className="form-control" placeholder="Address Line 5" value={this.props.addressLine5} onChange={this.props.updateAddressLine5}/>
                        </div>
						<div className="form-group">
                            <label>Postal Code</label>
                            <input id="PostalCode" className="form-control" placeholder="Postal Code" value={this.props.postalCode} onChange={this.props.updatePostalCode}/>
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