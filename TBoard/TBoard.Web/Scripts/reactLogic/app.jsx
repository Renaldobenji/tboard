var login = React.createClass({

    getInitialState: function () {
        return {
            Username: "Renaldo",
            Password: "Renaldo",
            JWSToken: ""
        };
    },

  registerClick: function(event) {
		routie('register');
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
      $.ajax({
          url: 'api/Authentication/'+this.state.Username+'/'+this.state.Password,
          dataType: 'json',
          cache: false,
          success: function (result) {
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
				React.createElement(RFQRequest, null), document.getElementById('container')
			);
        }
        ,
        'rfqmyrequest': function () {
            ReactDOM.render(
				React.createElement(MyRFQ, null), document.getElementById('container')
			);
        }
        ,
        'rfqallrequest': function () {
            ReactDOM.render(
				React.createElement(MyAllRFQ, null), document.getElementById('container')
			);
        }
        ,
        'rfqmyactivebids': function () {
            ReactDOM.render(
				React.createElement(MyActiveBids, null), document.getElementById('container')
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

routie('login/:returnURL', function (returnURL) {
    ReactDOM.render(
				React.createElement(login, { returnURL: returnURL }), document.getElementById('container')
			);
});