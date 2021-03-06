﻿/*Register Page*/
var UserManagement = React.createClass({

    getInitialState: function() {
			return {
						Name : '',
						Surname : '',
						Password : '',
						ConfirmPassword : '',
						IDNumber : '',
                        Username : '',
                        Title: '',
                        Email: '',
                        OrganizationID: "",
                        DepartmentCode: "",
                        EmployeeNumber: ""
					};

	},

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ OrganizationID: decodedToken.OrganizationID });        
    },

    createUserPOST : function() {
        console.log('POSTING FORM');
        $.ajax({
                  url: 'api/User/Post',
                  type: 'POST',
                  dataType: 'json',
                  data: this.state,
                  cache: false,
                  success: function(data) {
                      var opts = {
                          title: "Success",
                          text: "That thing that you were trying to do worked.",
                          addclass: "stack-bottomright",
                          type: "success",
                          nonblock: {
                              nonblock: true
                          }
                      };
                      new PNotify(opts);
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error('api/Registration/Post', status, err.toString());
                  }.bind(this)
            });
    },

    updateName : function(e){
		this.setState({Name : e.target.value});		
    },
    updateEmail: function (e) {
        this.setState({ Email: e.target.value });
    },
	updateSurname : function(e){
		this.setState({Surname : e.target.value});		
	},
	updatePassword : function(e){
		this.setState({Password : e.target.value});		
	},
	updatePasswordConfirm : function(e){
		this.setState({ConfirmPassword : e.target.value});		
	},
	updateIDNumber : function(e){
		this.setState({IDNumber : e.target.value});	
		console.log(this.state.IDNumber);
	},
    updateUsername : function(e){
		this.setState({Username : e.target.value});	
		console.log(this.state.Username);
	},
    updateTitle : function(e){
		this.setState({Title : e.target.value});	
		console.log(this.state.Title);
    },
    updateDepartmentCode: function (e) {
        this.setState({ DepartmentCode: e.target.value });
        console.log(this.state.DepartmentCode);
    },
    updateEmployeeNumber: function (e) {
        this.setState({ EmployeeNumber: e.target.value });
        console.log(this.state.EmployeeNumber);
    },
    	
	render: function(){
        var navBarSyle= {
              marginBottom:0
            };
	    
        
		return (
	                <div>		
				        <nav className="navbar navbar-default navbar-static-top" role="navigation" style={navBarSyle}>
	                        <NavHeader />
                            <NavMenu />
                        </nav>
                        <div id="page-wrapper">
	                        <div className="row">
		                        <div className="col-lg-12">
			                        <h1 className="page-header">
                                        User Management  &nbsp;
                                        <button className="btn btn-outline btn-primary" data-toggle="modal" data-target="#myModal">
			                               New User
		                                </button>
                                    </h1>
		                        </div>
	                        </div>
                            <div className="row"> 
                                <UserList OrganizationID={this.state.OrganizationID} />
                            </div>
                        </div>
                        <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			                <div className="modal-dialog">
				                <div className="modal-content">
					                <div className="modal-header">
						                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
						                <h4 className="modal-title" id="myModalLabel">Create User</h4>
					                </div>
					                <div className="modal-body">
						                <form>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input id="Username" className="form-control" placeholder="Username" value={this.state.Username} onChange={this.updateUsername} />
                                            </div>
						                    <div className="form-group">
                                                <label>Name</label>
                                                <input id="Name" className="form-control" placeholder="Name" value={this.state.Name} onChange={this.updateName} />
                                            </div>
						                    <div className="form-group">
                                                <label>Surname</label>
                                                <input id="Surname" className="form-control" placeholder="Surname" value={this.state.Surname} onChange={this.updateSurname}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Title</label>
                                                <input id="Title" className="form-control" placeholder="Title" value={this.state.Title} onChange={this.updateTitle} />
                                            </div>
						                    <div className="form-group">
                                                <label>Password</label>
                                                <input id="Password" className="form-control" placeholder="Password" value={this.state.Password} onChange={this.updatePassword}/>
                                            </div>
						                    <div className="form-group">
                                                <label>Confirm Password</label>
                                                <input id="ConfirmPassword" className="form-control" placeholder="Confirm Password" value={this.state.ConfirmPassword} onChange={this.updatePasswordConfirm}/>
                                            </div>
						                    <div className="form-group">
                                                <label>ID Number</label>
                                                <input id="IDNumber" className="form-control" placeholder="ID Number" value={this.state.IDNumber} onChange={this.updateIDNumber}/>
                                            </div>
                                            <div className="form-group">
                                                <label>Department Code</label>
                                                <input id="DepartmentCode" className="form-control" placeholder="Department Code" value={this.state.DepartmentCode} onChange={this.updateDepartmentCode} />
                                            </div>
                                            <div className="form-group">
                                                <label>Employee Number</label>
                                                <input id="EmployeeNumber" className="form-control" placeholder="Employee Number" value={this.state.EmployeeNumber} onChange={this.updateEmployeeNumber} />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input id="Email" className="form-control" placeholder="Email" value={this.state.Email} onChange={this.updateEmail} />
                                            </div>
					                    </form>
					                </div>
					                <div className="modal-footer">
						                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
						                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick= {this.createUserPOST} >Create</button>
					                </div>
				                </div>				
			                </div>			
		                </div>
                    </div>  
                
		);
	}
});


/*Register Page*/
var UserList = React.createClass({       

    getInitialState: function () {
        return { data: [] }
    },

    loadData: function () {
        $.ajax({           
            url: 'api/User/GetByOrganization/' + this.props.OrganizationID,
            success: function (data) {
                this.setState({ data: data.data });
            }.bind(this)
        })
    },

    componentWillMount: function () {
        this.loadData();
    },
    	
	render: function(){
        var navBarSyle= {
              marginBottom:0
            };       

        function actionsFormatter(cell, row) {
            return <UserDetailsView UserID={row.UserID }/>;
        }
        
		return (
                    <div className="col-lg-12">
				        <BootstrapTable data={this.state.data} striped={true} hover={true} pagination={true} search={true}>
                          <TableHeaderColumn isKey={true} dataField="FirstName" dataSort={true}>FirstName</TableHeaderColumn>
                          <TableHeaderColumn dataField="Surname" dataSort={true}>Surname</TableHeaderColumn>
                          <TableHeaderColumn dataField="IDNumber" dataSort={true}>IDNumber</TableHeaderColumn>
                          <TableHeaderColumn dataField="EmployeeNumber" dataSort={true}>EmployeeCode</TableHeaderColumn>
                          <TableHeaderColumn dataField="DepartmentCode" dataSort={true}>DepartmentCode</TableHeaderColumn>
                          <TableHeaderColumn dataField="Created" dataSort={true}>Created</TableHeaderColumn>                          
                          <TableHeaderColumn dataField="IsApproved" dataSort={true}>IsApproved</TableHeaderColumn>                  
                          <TableHeaderColumn dataFormat={actionsFormatter}>Detail</TableHeaderColumn>
				        </BootstrapTable>
			        </div>
                
		);
	}
});

var UserDetailsView = React.createClass({
    
    handleClick: function () {
        // Explicitly focus the text input using the raw DOM API.
        //alert(this.props.reference);
        routie('userdetail/' + this.props.UserID);
    },

    render: function () { 

        return (
				 <button className="btn btn-outline btn-warning btn-sm" onClick={this.handleClick}>View</button>
		)
}
});
