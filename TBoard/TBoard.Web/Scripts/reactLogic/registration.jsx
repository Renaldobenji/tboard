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
								<div className="checkbox">
									<label>
										<input type="checkbox" className="registrationOptions" name="registrationOptions" value="PrivateBuyer" onChange={this.props.updateRegistrationTypeState}/> Private Buyer
									</label>
								</div>
								<div className="checkbox">
									<label>
										<input type="checkbox" className="registrationOptions" name="registrationOptions" value="CorporateBuyer" onChange={this.props.updateRegistrationTypeState}/> Corporate Buyer
									</label>
								</div>
								<div className="checkbox">
									<label>
										<input type="checkbox" className="registrationOptions" name="registrationOptions" value="CorporateSeller" onChange={this.props.updateRegistrationTypeState}/> Supplier
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
                            <label className="form-check-label" for="exampleCheck1"  style={{"padding-right": '10px'}}>By clicking Register, you agree to our Terms and that you have read our Data Use Policy, including our Cookie Use.</label>
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

	validateEmail: function (sEmail) {
	    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	    if (filter.test(sEmail)) {
	        return true;
	    }
	    else {
	        return false;
	    }
	},

    registerUserPOST : function() {
        console.log('POSTING FORM');

        //check for mandatory fields
        var manfields = '';
        if (this.state.Surname == '')
        {
            manfields += "Surname, "
        }
        if (this.state.Password == '') {
            manfields += "Password, "
        }
        if (this.state.ConfirmPassword == '')
        {
            manfields += "ConfirmPassword, "
        }
        if (this.state.Username == '') {
            manfields += "Username"
        }       

        if (manfields != '')
        {
            alert("Please fill in the following missing fields " + manfields);
            return;
        }

        if (!this.validateEmail(this.state.Username))
        {
            alert("Please enter valid email address");
            return;
        }

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
                          window.location.href = '/RegistrationComplete/Index'; //one level up
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
		
    updateRegistrationTypeState: function (e) {

        /* declare an checkbox array */
        var chkArray = [];

        /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
        $(".registrationOptions:checked").each(function () {
            chkArray.push($(this).val());
        });

        /* we join the array separated by the comma */
        var selected;
        selected = chkArray.join(',');
        
        this.setState({ RegistrationType: selected });
		console.log(this.state.RegistrationType);	
	},
	updateNameState : function(e){
		this.setState({Name : e.target.value});		
	},
	updateUsername: function (e) {
	    this.setState({ Username: e.target.value });
	    this.setState({ Email: e.target.value });
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
            
            <div>
            <div id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
                <nav id="menu" className="navbar navbar-default">
                    <div className="container">                
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span> </button>
                            <a className="navbar-brand page-scroll" href="/">
                                <img src="/Images/Logo01.png" style={{width:120}} />
                            </a>
                        </div>               
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/Admin" className="page-scroll">Register</a></li>
                            </ul>
                        </div>               
                    </div>           
                </nav>
            </div>


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
                                        <a href="#step5" data-toggle="tab" aria-controls="step5" role="tab" title="Step 5">
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
                                            <li><button type="button" className="btn btn-primary btn-info-full next-step">Next</button></li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane" role="tabpanel" id="step5" >
                                        <RegisterTC />
                                        <ul className="list-inline pull-right">
                                            <li><button type="button" className="btn btn-default prev-step">Previous</button></li>
                                            <li><button type="button" className="btn btn-primary btn-info-full next-step">I Accept</button></li>
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
                    <div class="card">
                            <form>
                        <div className="form-group">
                            <label label for="Username" className="col-sm-3 control-label">Email</label>
                            <div className="col-sm-9" style={{margin:"inherit"}}>                                        
                                <input id="Username" className="form-control" placeholder="Email" value={this.props.Username} onChange={this.props.updateUsername} />
                            </div>                            
                        </div>
						<div className="form-group">
                            <label label for="Name" className="col-sm-3 control-label">Name</label>
                            <div className="col-sm-9" style={{margin:"inherit"}}>
	                            <input id="Name" className="form-control" placeholder="Name" value={this.props.name} onChange={this.props.updateName} />
                            </div>
						</div>
						<div className="form-group">
                            <label label for="Surname" className="col-sm-3 control-label">Surname</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="Surname" className="form-control" placeholder="Surname" value={this.props.surname} onChange={this.props.updateSurname} />
</div>
						</div>
						<div className="form-group">
                            <label label for="Password" className="col-sm-3 control-label">Password</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="Password" className="form-control" placeholder="Password" value={this.props.password} onChange={this.props.updatePassword} />
</div>
						</div>
						<div className="form-group">
                            <label label for="ConfirmPassword" className="col-sm-3 control-label">Confirm Password</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="ConfirmPassword" className="form-control" placeholder="Confirm Password" value={this.props.confirmPassword} onChange={this.props.updateConfirmPassword} />
</div>
						</div>						
						<div className="form-group">
                <label label for="CompanyName" className="col-sm-3 control-label">CompanyName</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="CompanyName" className="form-control" placeholder="Company Name" value={this.props.orgName} onChange={this.props.updateOrgName} />
</div>
						</div>
                            </form>
                    </div>
					
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
	 <label label for="CellNumber" className="col-sm-3 control-label">Cell Number</label>
	<div className="col-sm-9" style={{margin:"inherit"}}>
		<input id="CellNumber" className="form-control" placeholder="Cell Number" value={this.props.cellNumber} onChange={this.props.updateCellNumber} />
	</div>

						</div>
						<div className="form-group">
                             <label label for="HomeNumber" className="col-sm-3 control-label">Home Number</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="HomeNumber" className="form-control" placeholder="Home Number" value={this.props.homeNumber} onChange={this.props.updateHomeNumber} />
</div>
						</div>
						<div className="form-group">
                             <label label for="WorkNumber" className="col-sm-3 control-label">Work Number</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="WorkNumber" className="form-control" placeholder="Work Number" value={this.props.officeNumber} onChange={this.props.updateOfficeNumber} />
</div>
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
                             <label label for="AddressLine1" className="col-sm-3 control-label">AddressLine1</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="AddressLine1" className="form-control" placeholder="Address Line 1" value={this.props.addressLine1} onChange={this.props.updateAddressLine1} />
</div>
						</div>
						<div className="form-group">
                           <label label for="AddressLine2" className="col-sm-3 control-label">AddressLine2</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="AddressLine2" className="form-control" placeholder="Address Line 2" value={this.props.addressLine2} onChange={this.props.updateAddressLine2} />
</div>
						</div>
						<div className="form-group">
                           <label label for="AddressLine3" className="col-sm-3 control-label">AddressLine3</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="AddressLine3" className="form-control" placeholder="Address Line 3" value={this.props.addressLine3} onChange={this.props.updateAddressLine3} />
</div>
						</div>
						<div className="form-group">
                            <label label for="AddressLine4" className="col-sm-3 control-label">AddressLine4</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="AddressLine4" className="form-control" placeholder="Address Line 4" value={this.props.addressLine4} onChange={this.props.updateAddressLine4} />
</div>
						</div>
						<div className="form-group">
                           <label label for="AddressLine5" className="col-sm-3 control-label">AddressLine5</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="AddressLine5" className="form-control" placeholder="Address Line 5" value={this.props.addressLine5} onChange={this.props.updateAddressLine5} />
</div>
						</div>
						<div className="form-group">
                            <label label for="PostalCode" className="col-sm-3 control-label">Postal Code</label>
<div className="col-sm-9" style={{margin:"inherit"}}>
	<input id="PostalCode" className="form-control" placeholder="Postal Code" value={this.props.postalCode} onChange={this.props.updatePostalCode} />
</div>
						</div>
					</form>
				</div>
			</div>
		);
    }
});


var RegisterTC = React.createClass({
    render: function(){
        return (
			<div  className="scrollTC">
                <div className="panel panel-default"><div className="panel-heading"><i className="fa fa-clock-o fa-fw"></i>Terms and Conditions</div><div className="panel-body"><ul className="timeline"><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">Privacy Policy and Disclaimer</h4></div><div className="timeline-body"><p>Tenderboard is committed to protecting your privacy and to comply with applicable data protection and privacy laws. Users may need to contact Tenderboard for information on how to opt-in or opt-out of use of their information. We invite you to contact us if you have questions about this policy. You may contact us by mail at the following address: Tenderboard 5, Olivene Street Lime Acres 8410 You may contact us by e-mail: support@tenderboard.co.za You may call us: +27 72 455 9730</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">Complaints Procedure</h4></div><div className="timeline-body"><p>If you are unsatisfied with the service you have received please contact: Customer Support Team Email: support@tenderboard.co.za (Please make the email subject line as follows: Official Complaint) Phone: +27 72 455 9730 You will receive an acknowledgement your complaint and we will send you a ticket/complaint number within 1 working day. Your complaint will be investigated and replied to within 5 working days.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">Data Collection</h4></div><div className="timeline-body"><p>We collect the following information: • Full IP address At the user's option, we may also collect the following data: • HTTP cookies • User's Name • Home mailing address • Home e-mail address • Organization Name • Mailing address • Telephone Number • Fax Number • Email Address • Home Page Address • Business registration, including details of directorship and membership • Tax compliance information • Broad-based Black Economic Empowerment (BBBEE) information • Bank account information This data will be used for the following purposes: • Completion and support of the current activity. • Historical preservation. This data will be used by ourselves and our agents. In addition, the following types of entities will receive this information: • Delivery services. The following explanation is provided for why this data is collected: Statutory Requirement to collect information for taxation and delivery purposes</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">Cookies</h4></div><div className="timeline-body"><p>A Cookie is a small piece of data or message that is sent from a web server to your browser and is stored on your hard drive. It is then read when you visit other pages in the same website. A Cookie cannot read data off your hard disk or read Cookie files created by other sites. Cookies do not damage your system. For further information visit www.aboutcookies.org or www.allaboutcookies.org. You can set your browser to refuse Cookies or to alert you to when a Cookie is being sent. For information about this look in your browser’s ‘help’ facility. The above Websites also tell you how to remove Cookies from your browser. If you choose not to accept our Cookies, some of the features of our Website may not work as well as we intend. We use Cookies for the purposes of system administration of our Website, to give us information about the number of visitors to different parts of our Website, to allow certain features of the web site to work, and to enhance your visit to our Website.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">Disclaimer</h4></div><div className="timeline-body"><p>The information contained in this website is for general information purposes only. The information is provided by Tenderboard and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website. Through this website you are able to link to other websites which are not under the control of Tenderboard. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. Every effort is made to keep the website up and running smoothly. However, Tenderboard takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">Disclaimer for external links</h4></div><div className="timeline-body"><p>Please note that by accessing external link you will leave the Tenderboard web site. We have a variety of links to our preferred partner’s sites and may display advertisements from third parties on our site. We are not responsible for the content or privacy policies of these sites or third party advertisers, or for the way in which information about their users is treated. We are not authorized to make representations on their behalf and can not warrant or accept any liability for the content of these sites.</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">Tenderboard Web Site Licence Agreement &amp;Tenderboard E-Procurement Website Terms and Conditions of Supply</h4></div><div className="timeline-body"><p>1. THIS AGREEMENT is made BETWEEN: Tenderboard 5 Olivene Street, Lime Acres, 8410 ('we ') and the business as identified on the Online Registration Process (“you”).</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">TERMS OF WEBSITE USE</h4></div><div className="timeline-body"><p> 2.1 This page (together with the documents referred to on it) tells you the terms and conditions on which we supply to you any of the e-procurement services (Services) listed on Tenderboard’s website (our site). Please read these terms and conditions carefully before ordering any Services from our site. You should understand that by ordering any of our Services, you agree to be bound by these terms and conditions. 2.2 You should print a copy of these terms and conditions for future reference.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">3. YOUR STATUS</h4></div><div className="timeline-body"><p> By placing an order for a Service through our site, you warrant that: (a) You are not a consumer, but a business user; (b) You are legally capable of entering into binding contracts; and (c) You are at least 18 years old.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">4. HOW THE CONTRACT IS FORMED BETWEEN YOU AND US</h4></div><div className="timeline-body"><p> After placing an order for a Service, you will receive an e-mail from us acknowledging that we have received your order. Please note that this does not mean that your order has been accepted. Your order constitutes an offer to us to buy a Service. All orders are subject to acceptance by us, and we will confirm such acceptance to you by sending you an e-mail that confirms that the order has been accepted. (the Order Confirmation). The contract between us (Contract) will only be formed when we send you the Order Confirmation.</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">5. ACCESSING OUR SITE</h4></div><div className="timeline-body"><p> 5.1 Subject to these terms and conditions we grant to you a non-exclusive, non-transferable right to use our site to receive the Service that you have ordered. A description of the Service that you have ordered can be found on our site. 5.2 Access to our site is permitted on a temporary basis, and we reserve the right to withdraw or amend the service we provide on our site without notice (see below). We will not be liable if for any reason our site is unavailable at any time or for any period. 5.3 From time to time, we may restrict access to some parts of our site, or our entire site, to users who have registered with us. 5.4 Without prejudice to paragraph 5.3, we shall use our reasonable endeavours to ensure that our site is functional at all times. 5.5 If you choose, or you are provided with, a user identification code, password or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any third party. We have the right to disable any user identification code or password, whether chosen by you or allocated by us, at any time, if in our opinion you have failed to comply with any of the provisions of these terms of use. 5.6 You are responsible for making all arrangements necessary for you to have access to our site. You are also responsible for ensuring that all persons who access our site through your internet connection are aware of these terms, and that they comply with them. 5.7 We reserve the rights to use your uploaded company logo and your company name in our promotional literature in both electronic and hardcopy format for promotional and advertising purposes.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">6. INTELLECTUAL PROPERTY RIGHTS</h4></div><div className="timeline-body"><p> 6.1 We are the owner or the licensee of all intellectual property rights in our site, and in the material published on it, with the exception of intellectual property rights in data supplied to the Company by the Client which will remain with the Client . Those works are protected by copyright laws and treaties around the world. All such rights are reserved. 6.2 We retain control over the lay-out and positioning of your website pages used on our site in relation to the Services (Your Pages) and the right to place acknowledgments concerning the design, hosting and programming of your Pages on each page display. We reserve the right to take down Your Pages if you interfere with our acknowledgement in any way whatsoever and to terminate these terms and conditions forthwith. 6.3 Should you decide to transfer Your Pages to another provider, the content of Your Pages can be provided to you but we give no guarantee Your Pages will work independently without some adjustment. We will charge you for any such adjustment carried out by us at your request. 6.4 You must not modify the paper or digital copies of any materials on our site that you have printed off or downloaded in any way, and you must not use any illustrations, photographs, video or audio sequences or any graphics separately from any accompanying text. 6.5 If you print off, copy or download any part of our site in breach of these terms of use, your right to use our site will cease immediately and you must, at our option, return or destroy any copies of the materials you have made. 6.6 You will fully and effectively indemnify us against any claims, demands, costs, professional fees and other expenses of any kind in relation to any breach by you of these terms and conditions and any breach or infringement of intellectual property rights whatsoever in relation to information you request us to put on Your Pages.</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">7. RELIANCE ON INFORMATION POSTED</h4></div><div className="timeline-body"><p> Commentary and other materials posted on our site are not intended to amount to advice on which reliance should be placed. We therefore disclaim all liability and responsibility arising from any reliance placed on such materials by any visitor to our site, or by anyone who may be informed of any of its contents.</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">8. OUR SITE CHANGES REGULARLY</h4></div><div className="timeline-body"><p> We aim to update our site regularly, and may change the content at any time. If the need arises, we may suspend access to our site, or close it indefinitely. Any of the material on our site may be out of date at any given time, and we are under no obligation to update such material.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">9. PRICE AND PAYMENT</h4></div><div className="timeline-body"><p> 9.1 The price of any Services will be as quoted on our site from time to time, except in cases of obvious error. These prices exclude VAT, which will be added to the total amount due. 9.2 The ‘Verification Fee’ specified on our site is payable prior to the verification of your details provided on your registered profile on our site and is not refundable. The ‘Annual Fee’ specified on our site is payable on each anniversary of the Set Up Date. 9.3 We will provide notice at 30, 20, 10 and 7 days prior to the expiry date of your Annual Fee. Such notice will be sent by email at your last recorded email address. It is your responsibility to us of any changes in contact details. In addition to notice, you will also receive an alert when logging into Your Pages If payment is not made immediately on receipt of the notice and, in any event, before the expiry date then we reserve the rights to turn off Your Pages website without further notice and without liability. 9.4 Prices are liable to change at any time, but changes will not affect orders in respect of which we have already sent you an Order Confirmation. 9.5 Our site contains a number of Services and it is always possible that, despite our best efforts, some of the Services listed on our site may be incorrectly priced. We will normally verify prices as part of our order confirmation procedures so that, where a Service's correct price is less than our stated price, we will charge the lower amount when confirming the order. If a Service’s correct price is higher than the price stated on our site, we will normally, at our discretion, either contact you for instructions before confirming the order, or reject your order and notify you of such rejection. 9.6 We are under no obligation to provide the Service to you at the incorrect (lower) price, even after we have sent you an Order Confirmation, if the pricing error is obvious and unmistakeable and could have reasonably been recognised by you as a mis-pricing. 9.7 Payment for all Services must be made within fourteen (14) days of receipt by you of an Order Confirmation.</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">10. OUR LIABILITY</h4></div><div className="timeline-body"><p> 10.1 We warrant to you that any Service purchased from us through our site is of satisfactory quality. 10.2 Our liability in connection with any Service purchased through our site is strictly limited to the purchase price of that Service. 10.3 This does not include or limit in any way our liability: (a) For death or personal injury caused by our negligence;(b) Under section 2(3) of the Consumer Protection Act 1987; (c) For fraud or fraudulent misrepresentation; or(d) For any matter for which it would be illegal for us to exclude, or attempt to exclude, our liability. 10.4 We accept no liability for any loss of income or revenue, loss of business, loss of profits or contracts, loss of anticipated savings, loss of data, waste of management or office time or for any indirect or consequential loss or damage of any kind however arising and whether caused by tort (including negligence), breach of contract or otherwise, even if foreseeable.</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">11. VIRUSES, HACKING AND OTHER OFFENCES</h4></div><div className="timeline-body"><p> 11.1 You must not misuse our site by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. You must not attempt to gain unauthorised access to our site, the server on which our site is stored or any server, computer or database connected to our site. You must not attack our site via a denial-of-service attack or a distributed denial-of service attack. 11.2 You agree and warrant that any and all material of every kind which you store or display on Your Pages or transmit using our equipment should at all times be free from any and all damaging software defects, including, but not limited to, viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful, which may cause software or hardware disruption and failure, significantly reduced computer operating speed or compromise any security system and that all such materials shall at all times comply with all laws, including, but not limited to, all European, National and local laws throughout the UK and your local laws. 11.3 By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use our site will cease immediately. 11.4 We will not be liable for any loss or damage caused by a distributed denial-of-service attack, viruses or other technologically harmful material that may infect your computer equipment, computer programs, data or other proprietary material due to your use of our site or to your downloading of any material posted on it, or on any website linked to it.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">12. TERMINATION WITHOUT CAUSE</h4></div><div className="timeline-body"><p> These terms and conditions may be terminated by either party at any time upon 7 days written notice delivered to the address of the relevant party or sent by e-mail for Tenderboard to support@tenderboard.co.za or for you to your last recorded email address. On termination there will be no refunds of any fees paid.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">13. WRITTEN COMMUNICATIONS</h4></div><div className="timeline-body"><p> Applicable laws require that some of the information or communications we send to you should be in writing. When using our site, you accept that communication with us will be mainly electronic. We will contact you by e-mail or provide you with information by posting notices on our website. For contractual purposes, you agree to this electronic means of communication and you acknowledge that all contracts, notices, information and other communications that we provide to you electronically comply with any legal requirement that such communications be in writing. You will receive an acknowledgement your communication and we aim to respond to all points of contact within 1 working day and aim to resolve any issues within 3 working days. This condition does not affect your statutory rights.</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">14. NOTICES</h4></div><div className="timeline-body"><p> All notices given by you to us must be given to Tenderboard, 5 Olivene Street, lime Acres, 8410. We may give notice to you at either the e-mail or postal address you provide to us when placing an order, or in any of the ways specified in paragraph 13 above. Notice will be deemed received and properly served immediately when posted on our website, 24 hours after an e-mail is sent, or three days after the date of posting of any letter. In proving the service of any notice, it will be sufficient to prove, in the case of a letter, that such letter was properly addressed, stamped and placed in the post and, in the case of an e-mail, that such e-mail was sent to the specified e-mail address of the addressee.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">15. TRANSFER OF RIGHTS AND OBLIGATIONS</h4></div><div className="timeline-body"><p> 15.1 The contract between you and us is binding on you and us and on our respective successors and assigns. 15.2 You may not transfer, assign, charge or otherwise dispose of a Contract, or any of your rights or obligations arising under it, without our prior written consent. 15.3 We may transfer, assign, charge, sub-contract or otherwise dispose of a Contract, or any of our rights or obligations arising under it, at any time during the term of the Contract.</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">16. EVENTS OUTSIDE OUR CONTROL</h4></div><div className="timeline-body"><p> 16.1 We will not be liable or responsible for any failure to perform, or delay in performance of, any of our obligations under these terms and conditions or a Contract that is caused by events outside our reasonable control (Force Majeure Event). 16.2 A Force Majeure Event includes any act, event, non-happening, omission or accident beyond our reasonable control and includes in particular (without limitation) the following: (a) Strikes, lock-outs or other industrial action.(b) Civil commotion, riot, invasion, terrorist attack or threat of terrorist attack, war (whether declared or not) or threat or preparation for war.(c) Fire, explosion, storm, flood, earthquake, subsidence, epidemic or other natural disaster.(d) Impossibility of the use of railways, shipping, aircraft, motor transport or other means of public or private transport.(e) Impossibility of the use of public or private telecommunications networks.(f) The acts, decrees, legislation, regulations or restrictions of any government. 16.3 Our performance under these terms and conditions or any Contract is deemed to be suspended for the period that the Force Majeure Event continues, and we will have an extension of time for performance for the duration of that period. We will use our reasonable endeavours to bring the Force Majeure Event to a close or to find a solution by which our obligations under these terms and conditions or any Contract may be performed despite the Force Majeure Event.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">17. WAIVER</h4></div><div className="timeline-body"><p> 17.1 If we fail, at any time during the term of these terms and conditions, to insist upon strict performance of any of your obligations under these terms and conditions, or if we fail to exercise any of the rights or remedies to which we are entitled under the Contract, this shall not constitute a waiver of such rights or remedies and shall not relieve you from compliance with such obligations. 17.2 A waiver by us of any default shall not constitute a waiver of any subsequent default. 17.3 No waiver by us of any of these terms and conditions shall be effective unless it is expressly stated to be a waiver and is communicated to you in writing in accordance with paragraph 14 above.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">18. SEVERABILITY</h4></div><div className="timeline-body"><p> If any of these terms and conditions or any provisions of a Contract are determined by any competent authority to be invalid, unlawful or unenforceable to any extent, such term, condition or provision will to that extent be severed from the remaining terms, conditions and provisions which will continue to be valid to the fullest extent permitted by law.</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">19. ENTIRE AGREEMENT</h4></div><div className="timeline-body"><p> 19.1 These terms and conditions and any document expressly referred to in them represent the entire agreement between us in relation to the subject matter of any Contract and supersede any prior agreement, understanding or arrangement between us, whether oral or in writing. 19.2 We each acknowledge that, in entering into a Contract, neither of us has relied on any representation, undertaking or promise given by the other or be implied from anything said or written in negotiations between us prior to such Contract except as expressly stated in these terms and conditions. 19.3 Neither of us shall have any remedy in respect of any untrue statement made by the other, whether orally or in writing, prior to the date of any Contract (unless such untrue statement was made fraudulently) and the other party’s only remedy shall be for breach of contract as provided in these terms and conditions.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">20. OUR RIGHT TO VARY THESE TERMS AND CONDITIONS</h4></div><div className="timeline-body"><p> 20.1 We have the right to revise and amend these terms and conditions from time to time. 20.2 You will be subject to the policies and terms and conditions in force at the time that you order Services from us, unless any change to those policies or these terms and conditions is required to be made by law or governmental authority (in which case it will apply to orders previously placed by you), or if we notify you of the change to those policies or these terms and conditions before we send you the Order Confirmation (in which case we have the right to assume that you have accepted the change to the terms and conditions, unless you notify us to the contrary within seven working days of receipt by you of the Services).</p></div></div></li><li className="timeline-inverted"><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">21. LAW AND JURISDICTION</h4></div><div className="timeline-body"><p> Contracts for the purchase of Services through our site will be governed by English law. Any dispute arising from, or related to, such Contracts shall be subject to the non-exclusive jurisdiction of the courts of England and Wales.</p></div></div></li><li><div className="timeline-panel"><div className="timeline-heading"><h4 className="timeline-title">22. TENDERBOARD SITES MAY SET AND ACCESS COOKIES ON YOUR COMPUTER.</h4></div><div className="timeline-body"><p> All Cookies used by the Web Site are used in accordance with the provisions of the Privacy and Electronic Communications (EC Directive) Regulations 2003 as amended by the Privacy and Electronic Communications (EC Directive) (Amendment) Regulations 2011. These Cookies have been carefully chosen to facilitate certain functions and features of the Web Site. We also use Cookies for analytics purposes. These Cookies track your movements and activities on the Web Site and are designed to give us a better understanding of our users, thus enabling us to improve the Web Site and our services. None of the Cookies set by the Web Site jeopardise your privacy in any way and no personal data is collected. By allowing the setting of our Cookies you are enabling us to provide the best possible experience and service to you through our Web Site. If you wish to deny your consent to the placing of Cookies, certain features of the Web Site may not function fully or as intended. Certain features of the Web Site depend upon Cookies to function and are deemed, within the law, to be strictly necessary. You will not be asked for your consent to place these Cookies however you may still disable cookies via your web browser’s settings. You can choose to enable or disable Cookies in your web browser. By default, your browser will accept Cookies, however this can be altered. For further details please consult the help menu in your browser. Disabling Cookies may prevent you from using the full range of Services available on the Web Site. You may delete Cookies at any time however you may lose any information that enables you to access the Web Site more quickly. It is recommended that you ensure that your internet browser is up-to-date and that you consult the help and guidance provided by the developer of your browser if you are unsure as to how to adjust your privacy settings.</p></div></div></li></ul></div></div>
            </div>
		);
                           }
                           });
