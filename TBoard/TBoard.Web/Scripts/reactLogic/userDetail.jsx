/*Register Page*/
var UserDetail = React.createClass({
    
    getInitialState: function () {
        return {
            FirstName: "",
            Surname: "",
            IDNumber: "",
            IsApproved: "",
            EmployeeNumber: "",
            DepartmentCode: "",
            UserID: this.props.userID
        };
    },

    componentWillMount: function () {
        this.GetUserInformation();
    },

    GetUserInformation: function () {        
        $.ajax({
            url: 'api/User/GetUserInformation/' + this.props.userID,
            success: function (data) {
                this.setState({ FirstName: data.data.FirstName });
                this.setState({ Surname: data.data.Surname });
                this.setState({ IDNumber: data.data.IDNumber });
                this.setState({ IsApproved: data.data.IsApproved });
                this.setState({ EmployeeNumber: data.data.EmployeeNumber });
                this.setState({ DepartmentCode: data.data.DepartmentCode });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/Cancel', status, err.toString());
            }.bind(this)
        });
    },

    ActivateUser: function () {
        $.ajax({
            url: 'api/User/ApproveUser/' + this.props.userID,
            success: function (data) {
                this.GetUserInformation();
                alert("Success");
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/Cancel', status, err.toString());
            }.bind(this)
        });
    },


    DeActivateUser: function () {
        $.ajax({
            url: 'api/User/DeActivateUser/' + this.props.userID,
            success: function (data) {
                this.GetUserInformation();
                alert("Success");
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/Cancel', status, err.toString());
            }.bind(this)
        });
    },

    updateFirstName: function (e) {
        this.setState({ FirstName: e.target.value });
    },

    updateSurname: function (e) {
        this.setState({ Surname: e.target.value });
    },

    updateIDNumber: function (e) {
        this.setState({ IDNumber: e.target.value });
    },
    updateDepartmentCode: function (e) {
        this.setState({ DepartmentCode: e.target.value });
        console.log(this.state.DepartmentCode);
    },
    updateEmployeeNumber: function (e) {
        this.setState({ EmployeeNumber: e.target.value });
        console.log(this.state.EmployeeNumber);
    },

    
    updateUserInformation: function () {
            console.log('POSTING FORM');
            $.ajax({
                url: 'api/User/Update',
                type: 'POST',
                dataType: 'json',
                data: this.state,
                cache: false,
                success: function(data) {
                    this.GetUserInformation();
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error('api/Registration/Post', status, err.toString());
                }.bind(this)
            });
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
                                        User Detail  &nbsp;                                        
                                    </h1>
		                        </div>
	                        </div>
                           
                            <div className="row"> 
                                <div className="col-md-9">
                                    <UserInformation updateUserInformation={this.updateUserInformation} updateDepartmentCode={this.updateDepartmentCode} updateEmployeeNumber={this.updateEmployeeNumber} EmployeeNumber={this.state.EmployeeNumber} DepartmentCode={this.state.DepartmentCode} IsApproved={this.state.IsApproved} UserID={this.props.userID} FirstName={this.state.FirstName} Surname={this.state.Surname} IDNumber={this.state.IDNumber} updateFirstName={this.updateFirstName} updateSurname={this.updateSurname} updateIDNumber={this.updateIDNumber}/>
                                </div>
                                <div className="col-md-3">
                                    <UserActions ActivateUser={this.ActivateUser} DeActivateUser={this.DeActivateUser} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <UserRFQContainer UserID={this.props.userID} />
                                </div>                                
                            </div>
                        </div>		                
                    </div>  
                
		);
	}
});


var UserRFQContainer = React.createClass({

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-7">                                        
                                User RFQ
                            </div>                                   
                        </div>
                    </div>
                    <div className="panel-body">                                
                        <AllRFQList UserID={this.props.UserID} />
                    </div>                    
                </div>
            )
}
});


var UserInformation = React.createClass({

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-7">                                        
                                User Information
                            </div>                                   
                        </div>
                    </div>
                    <div className="panel-body">                                
                        <div className="form-group">
                            <label>First Name</label>
                            <input className="form-control" value={this.props.FirstName} onChange={this.props.updateFirstName} placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <label>Surname</label>
                            <input className="form-control" value={this.props.Surname} onChange={this.props.updateSurname} placeholder="Surname" />
                        </div>
                        <div className="form-group">
                            <label>IDNumber</label>
                            <input className="form-control" value={this.props.IDNumber} onChange={this.props.updateIDNumber} placeholder="IDNumber" />
                        </div>
                        <div className="form-group">
                            <label>IsApproved</label>
                            <input className="form-control" value={this.props.IsApproved} placeholder="IDNumber" />
                        </div>
                        <div className="form-group">
                            <label>Department Code</label>
                            <input id="DepartmentCode" className="form-control" placeholder="Department Code" value={this.props.DepartmentCode} onChange={this.props.updateDepartmentCode} />
                        </div>
                        <div className="form-group">
                            <label>Employee Number</label>
                            <input id="EmployeeNumber" className="form-control" placeholder="Employee Number" value={this.props.EmployeeNumber} onChange={this.props.updateEmployeeNumber} />
                        </div>
                    </div>
                    <div className="panel-footer">
                        <div className="text-right">                                    
                            <button type="button" onClick={this.props.updateUserInformation} className="btn btn-primary btn-lg">Update</button>
                        </div>
                    </div>
                </div>
            )
}
});

var UserActions = React.createClass({

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-7">                                        
                                Actions
                            </div>                                   
                        </div>
                    </div>
                    <div className="panel-body">                                
                        <div className="form-group">
                            <button type="button" className="btn btn-outline btn-warning btn-lg btn-block" onClick={this.props.ActivateUser}>Approve</button>
                            <button type="button" className="btn btn-outline btn-warning btn-lg btn-block" onClick={this.props.DeActivateUser}>Deactivate</button>
                        </div>                        
                    </div>                    
                </div>
            )
}
});
