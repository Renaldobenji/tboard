var login = React.createClass({

    getInitialState: function () {
        return {
            Username: "",
            Password: "",
            JWSToken: "",
            percent: -1,
            autoIncrement: true,
            intervalTime: 200
        };
    },

  registerClick: function(event) {
		routie('register');
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

  
  loginClick: function (event) {      
      this.authenticateGET();      
  },

  updateUsername: function (e) {
      this.setState({ Username: e.target.value });
  },

  updatePassword: function (e) {
      this.setState({ Password: e.target.value });
  },
  
  authenticateGET: function () {
      this.startWithAutoIncrement();
      $.ajax({
          url: 'api/Authentication/'+this.state.Username+'/'+this.state.Password,
          dataType: 'json',
          cache: false,
          success: function (result) {
              this.stopWithAutoIncrement();
              if (result.authenicated == "true"){
                this.setState({ JWSToken: result.data });
                var sJWT = this.state.JWSToken;
                var sa = new TboardJWTToken();
                sa.store(sJWT);
                var tokens = new TboardJWTToken();
                var result = tokens.IsLoggedIn();
                
                if (this.props.returnURL == "")
                    routie('dashboard');

                if (typeof this.props.returnURL !== 'undefined')
                { var fixedURL = this.props.returnURL.replace('-', '/');
                routie(fixedURL);
                }
                else
                    routie('dashboard');
              }
              else
              {
                  alert(result.errorMessage);
              }
          }.bind(this),
          error: function (xhr, status, err) {
              console.error('api/Authentication/', status, err.toString());
          }.bind(this)
      });
  },

  render: function() {
    return (
			<div className="container">   
                <ProgressBar percent={this.state.percent}
                             autoIncrement={this.state.autoIncrement}
                             intervalTime={this.state.intervalTime} />             
				<div className="row">
					<div className="col-md-4 col-md-offset-4">
                        <img className="login-logo" src="../../Images/logos/Logo 01.png" width="100%" height="200px" />
						<div className="login-panel panel panel-default">                            
							<div className="panel-heading">
								<h3 className="panel-title">Please Sign In</h3>
							</div>
							<div className="panel-body">
								<form role="form">
									<fieldset>
										<div className="form-group">
											<input className="form-control" placeholder="E-mail" name="email" type="email" autofocus value={this.state.Username} onChange={this.updateUsername}/>
										</div>
										<div className="form-group">
											<input className="form-control" placeholder="Password" name="password" type="password" value={this.state.Password} onChange={this.updatePassword}/>
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
    '': function () {
            var tokens = new TboardJWTToken();
            var result = tokens.IsLoggedIn();

            $(document).ajaxStart(function () {
                $.LoadingOverlay("show", "rgba(255, 255, 255, 0.8)", document.getElementById('container'));
            });
            $(document).ajaxStop(function () {
                $.LoadingOverlay("hide");
            });            
            if (result == true)
            {
                routie('dashboard'); 
            }
            else
            {
                ReactDOM.render(
				React.createElement(login, null), document.getElementById('container')
			);
            } 			
		},
		'register': function(){
			ReactDOM.render(
				React.createElement(Register, null), document.getElementById('container')
			);
		}
        ,
		'dashboard': function () {

		    var tokens = new TboardJWTToken();
		    var result = tokens.IsLoggedIn();

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
        'personalDetails': function () {
            ReactDOM.render(
				React.createElement(PersonalDetails, null), document.getElementById('container')
			);
        }
        ,
        'users': function(){
			ReactDOM.render(
				React.createElement(UserManagement, null), document.getElementById('container')
			);
		}
        ,
        'document': function(){
			ReactDOM.render(
				React.createElement(DocumentManagement, null), document.getElementById('container')
			);
        }
        ,
        'rfqrequest': function () {
            ReactDOM.render(
				React.createElement(CommingSoon, null), document.getElementById('container')
			);
        }
        ,
        'rfqmyrequest': function () {
            ReactDOM.render(
				React.createElement(CommingSoon, null), document.getElementById('container')
			);
        }
        ,
        'rfqallrequest': function () {
            ReactDOM.render(
				React.createElement(CommingSoon, null), document.getElementById('container')
			);
        }
        ,
        'rfqmyactivebids': function () {
            ReactDOM.render(
				React.createElement(CommingSoon, null), document.getElementById('container')
			);
        }
         ,
        'myacceptedquotes': function () {
            ReactDOM.render(
				React.createElement(CommingSoon, null), document.getElementById('container')
			);
        }
        ,
        'bidswon': function () {
            ReactDOM.render(
				React.createElement(CommingSoon, null), document.getElementById('container')
			);
        }
        ,
        'bidslost': function () {
            ReactDOM.render(
				React.createElement(CommingSoon, null), document.getElementById('container')
			);
        }
         ,
        'report': function () {
            ReactDOM.render(
				React.createElement(CommingSoon, null), document.getElementById('container')
			);
        }
        ,
        'orgCreate': function () {
            ReactDOM.render(
				React.createElement(CreateOrganization, null), document.getElementById('container')
			);
        }
         ,
        'OrgInfo': function () {
            ReactDOM.render(
				React.createElement(OrganizationInformation, null), document.getElementById('container')
			);
        }
        ,
        'FinanceInfo': function () {
            ReactDOM.render(
                React.createElement(FinanceInformation, null), document.getElementById('container')
            );
        }
        ,
        'HrInfo': function () {
            ReactDOM.render(
                React.createElement(HumanResourcesInformation, null), document.getElementById('container')
            );
        }
        ,
        'RiskInsurance': function () {
            ReactDOM.render(
                React.createElement(InsuranceAndRisk, null), document.getElementById('container')
            );

        }
    
});

routie('rfqdetail/:rfqreference', function (rfqreference) {

    var tokens = new TboardJWTToken();
    var result = tokens.IsLoggedIn();

    ReactDOM.render(
				React.createElement(RfqDetail, { rfqreference: rfqreference }), document.getElementById('container')
			);
});

routie('rfqbid/:rfqreference', function (rfqreference) {
    ReactDOM.render(
				React.createElement(RfqBidScreen, { rfqreference: rfqreference }), document.getElementById('container')
			);
});

routie('rfqpay/:rfqreference', function (rfqreference) {
    ReactDOM.render(
				React.createElement(RfqPay, { rfqreference: rfqreference }), document.getElementById('container')
			);
});

routie('login/:returnURL', function (returnURL) {
    ReactDOM.render(
				React.createElement(login, { returnURL: returnURL }), document.getElementById('container')
			);
});

routie('userdetail/:userID', function (userID) {
    ReactDOM.render(
				React.createElement(UserDetail, { userID: userID }), document.getElementById('container')
			);
});