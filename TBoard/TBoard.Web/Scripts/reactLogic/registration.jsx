/*Register Page*/
var RegisterType = React.createClass({

    

    render: function () {
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
										<input type="radio" name="registrationOptions" id="registrationCorporateSeller" value="CorporateSeller" onChange={this.props.updateRegistrationTypeState}/> Supplier
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
            <div>
                <div className="panel panel-info">
                        <div className="panel-heading">
                            Registration 
                        </div>
                        <div className="panel-body">
                            <h3>Congratulations, you almost there!!!</h3>

                            <p>Please confirm your details</p>
                            <div className="text-center">
                            <p>RegistrationType: <span className="lead text-success">{this.props.RegistrationType}</span></p>
                            <p>Username: <span className="lead text-success">{this.props.Username}</span></p>
                            <p>Name: <span className="lead text-success">{this.props.Name}</span></p>
                            <p>Surname: <span className="lead text-success">{this.props.Surname}</span></p>
                            <p>IDNumber: <span className="lead text-success">{this.props.IDNumber}</span></p>
                            <p>OrganizationName: <span className="lead text-success">{this.props.OrganizationName}</span></p>
                            <p>CellNumber: <span className="lead text-success">{this.props.CellNumber}</span></p>
                            <p>HomeNumber: <span className="lead text-success">{this.props.HomeNumber}</span></p>
                            <p>OfficeNumber: <span className="lead text-success">{this.props.OfficeNumber}</span></p>
                            <p>Email: <span className="lead text-success">{this.props.Email}</span></p>
                            <p>AddressLine1: <span className="lead text-success">{this.props.AddressLine1}</span></p>
                            <p>AddressLine2: <span className="lead text-success">{this.props.AddressLine2}</span></p>
                            <p>AddressLine3: <span className="lead text-success">{this.props.AddressLine3}</span></p>
                            <p>AddressLine4: <span className="lead text-success">{this.props.AddressLine4}</span></p>
                            <p>AddressLine5: <span className="lead text-success">{this.props.AddressLine5}</span></p>
                            <p>PostalCode: <span className="lead text-success">{this.props.PostalCode}</span></p>
                            </div>
                        </div>
                        <div className="panel-footer text-right">
                            <button type="button" className="btn btn-success btn-lg" onClick={this.props.registerUserPOST }>Register</button>	
                        </div>
                </div>			    	
            </div>           
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
						PostalCode: '',
						percent: -1,
						autoIncrement: true,
						intervalTime: 200,
                        Username: ""
					};

	},

	componentDidMount: function () {
	    //Initialize tooltips
	    $('.nav-tabs > li a[title]').tooltip();

	    //Wizard
	    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
	        var $target = $(e.target);

	        if ($target.parent().hasClass('disabled')) {
	            return false;
	        }
	    });

	    $(".next-step").click(function (e) {
	        var $active = $('.wizard .nav-tabs li.active');
	        $active.next().removeClass('disabled');
	        nextTab($active);

	    });
	    $(".prev-step").click(function (e) {
	        var $active = $('.wizard .nav-tabs li.active');
	        prevTab($active);
	    });

	    function nextTab(elem) {
	        $(elem).next().find('a[data-toggle="tab"]').click();
	    }

	    function prevTab(elem) {
	        $(elem).prev().find('a[data-toggle="tab"]').click();
	    }
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

    registerUserPOST : function() {
        console.log('POSTING FORM');
        this.startWithAutoIncrement();
        $.ajax({
                  url: 'api/Registration/Post',
                  type: 'POST',
                  dataType: 'json',
                  data: this.state,
                  cache: false,
                  success: function (data) {
                      if (data.success == "True")
                      {
                          alert("Registration Complete");
                          window.location.href = '../'; //one level up
                      }
                      else
                      {
                          this.stopWithAutoIncrement();
                          alert(data.errorMessage);
                      }
                      
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error('api/Registration/Post', status, err.toString());
                  }.bind(this)
            });
    },
		
	updateRegistrationTypeState : function(e){
		this.setState({RegistrationType : e.currentTarget.value});	
		console.log(this.state.RegistrationType);	
	},
	updateNameState : function(e){
		this.setState({Name : e.target.value});		
	},
	updateUsername: function (e) {
	    this.setState({ Username: e.target.value });
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

	render: function () {
	    return (

			<div className="container">
                <ProgressBar percent={this.state.percent}
                             autoIncrement={this.state.autoIncrement}
                             intervalTime={this.state.intervalTime} />
				<div className="row">
                    <div className="col-lg-12">
                    <section>
                        <div className="wizard">
                            <div className="wizard-inner">
                                <div className="connecting-line"></div>
                                <ul className="nav nav-tabs" role="tablist">
                                    <li role="presentation" className="active">
                                        <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="Step 1">
                                            <span className="round-tab">
                                                <i className="glyphicon glyphicon-folder-open"></i>
                                            </span>
                                        </a>
                                    </li>

                                    <li role="presentation" className="disabled">
                                        <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="Step 2">
                                            <span className="round-tab">
                                                <i className="glyphicon glyphicon-pencil"></i>
                                            </span>
                                        </a>
                                    </li>
                                    <li role="presentation" className="disabled">
                                        <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="Step 3">
                                            <span className="round-tab">
                                                <i className="glyphicon glyphicon-picture"></i>
                                            </span>
                                        </a>
                                    </li>
                                    <li role="presentation" className="disabled">
                                        <a href="#step4" data-toggle="tab" aria-controls="step4" role="tab" title="Step 4">
                                            <span className="round-tab">
                                                <i className="glyphicon glyphicon-picture"></i>
                                            </span>
                                        </a>
                                    </li>
                                    <li role="presentation" className="disabled">
                                        <a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="Complete">
                                            <span className="round-tab">
                                                <i className="glyphicon glyphicon-ok"></i>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>


                                <div className="tab-content">
                                    <div className="tab-pane active" role="tabpanel" id="step1">
                                        <RegisterType updateRegistrationTypeState={this.updateRegistrationTypeState} regChecked={this.state.regChecked} />
                                        <ul className="list-inline pull-right">
                                            <li><button type="button" className="btn btn-primary next-step">Next</button></li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane" role="tabpanel" id="step2">
                                        <RegisterPersonal Username={this.state.Username} updateUsername={this.updateUsername} name={this.state.Name} updateName={this.updateNameState}
                                                          surname={this.state.Surname} updateSurname={this.updateSurnameState}
                                                          password={this.state.Password} updatePassword={this.updatePasswordState}
                                                          confirmPassword={this.state.ConfirmPassword} updateConfirmPassword={this.updatePasswordConfirmState}
                                                          idNumber={this.state.IDNumber} updateIDNumber={this.updateIDNumberState}
                                                          orgName={this.state.OrganizationName} updateOrgName={this.updateOrgNameState} />
                                        <ul className="list-inline pull-right">
                                            <li><button type="button" className="btn btn-default prev-step">Previous</button></li>
                                            <li><button type="button" className="btn btn-primary next-step">Next</button></li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane" role="tabpanel" id="step3">
                                        <RegisterContactDetails cellNumber={this.state.CellNumber} updateCellNumber={this.updateCellNumberState}
                                                                homeNumber={this.state.HomeNumber} updateHomeNumber={this.updateHomeNumberState}
                                                                officeNumber={this.state.OfficeNumber} updateOfficeNumber={this.updateOfficeNumberState}
                                                                email={this.state.Email} updateEmail={this.updateEmailState} />
                                        <ul className="list-inline pull-right">
                                            <li><button type="button" className="btn btn-default prev-step">Previous</button></li>
                                            <li><button type="button" className="btn btn-primary next-step">Next</button></li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane" role="tabpanel" id="step4">
                                        <RegisterAddress addressLine1={this.state.AddressLine1} updateAddressLine1={this.updateAddLine1State}
                                                         addressLine2={this.state.AddressLine2} updateAddressLine2={this.updateAddLine2State}
                                                         addressLine3={this.state.AddressLine3} updateAddressLine3={this.updateAddLine3State}
                                                         addressLine4={this.state.AddressLine4} updateAddressLine4={this.updateAddLine4State}
                                                         addressLine5={this.state.AddressLine5} updateAddressLine5={this.updateAddLine5State}
                                                         postalCode={this.state.PostalCode} updatePostalCode={this.updatePostalCodeState} />
                                        <ul className="list-inline pull-right">
                                            <li><button type="button" className="btn btn-default prev-step">Previous</button></li>
                                            <li><button type="button" className="btn btn-primary btn-info-full next-step">Save and continue</button></li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane" role="tabpanel" id="complete">                                       
                                        <RegisterComplete RegistrationType={this.state.RegistrationType} 
                                                          Name={this.state.Name} 
                                                          Username={this.state.Username} 
                                                          Surname={this.state.Surname} 
                                                          IDNumber={this.state.IDNumber} 
                                                          OrganizationName={this.state.OrganizationName} 
                                                          CellNumber={this.state.CellNumber} 
                                                          HomeNumber={this.state.HomeNumber} 
                                                          OfficeNumber={this.state.OfficeNumber} 
                                                          Email={this.state.Email} 
                                                          AddressLine1={this.state.AddressLine1} 
                                                          AddressLine2={this.state.AddressLine2} 
                                                          AddressLine3={this.state.AddressLine3} 
                                                          AddressLine4={this.state.AddressLine4} 
                                                          AddressLine5={this.state.AddressLine5} 
                                                          PostalCode={this.state.PostalCode} 
                                                          registerUserPOST={this.registerUserPOST} />
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                        </div>
                    </section>
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
					User Information
				</div>
				<div className="panel-body">
					<form>
                        <div className="form-group">
                            <label>Username</label>
                            <input id="Username" className="form-control" placeholder="Username" value={this.props.Username} onChange={this.props.updateUsername} />
                        </div>
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
						<div className="form-group" style={{display : this.props.email}}>
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