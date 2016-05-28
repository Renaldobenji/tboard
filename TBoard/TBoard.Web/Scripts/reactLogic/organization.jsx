var Organization = React.createClass({
    getInitialState: function() {
        return {
            Name: '',
            TradingName: '',
            RegistrationNumber: '',
            VatNumber: '',
            TaxNumber: '',
            OrganizationID: ""
        };
    },

    componentDidMount: function() {
        $.ajax({
          url: 'api/organization/1',
          dataType: 'json',
          cache: false,
          success: function(data) {
              var obj = $.parseJSON(data);
              if (obj.name != null)
                this.setState({Name : obj.name});
              if (obj.tradingName != null)
                this.setState({TradingName : obj.tradingName});
              if (obj.registrationNumber != null)
                this.setState({RegistrationNumber : obj.registrationNumber});
              if (obj.vatNumber != null)
                this.setState({VatNumber : obj.vatNumber});
              if (obj.taxNumber != null)
                this.setState({TaxNumber : obj.taxNumber});
              if (obj.organizationID != null)
                this.setState({OrganizationID : obj.organizationID});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('api/organization', status, err.toString());
          }.bind(this)
        });
    },
    
    registerUserPOST : function() {
        console.log('POSTING FORM');
        $.ajax({
                  url: 'api/Organization/Post',
                  type: 'POST',
                  dataType: 'json',
                  data: this.state,
                  cache: false,
                  success: function(data) {
                      alert(data);
                  }.bind(this),
                  error: function(xhr, status, err) {
                    console.error('api/Organization/Post', status, err.toString());
                  }.bind(this)
            });
    },

    updateName : function(e){
    this.setState({Name : e.target.value});		
    },
    updateTradingName : function(e){
    this.setState({TradingName : e.target.value});		
    },
    updateRegistrationNumber : function(e){
    this.setState({RegistrationNumber : e.target.value});		
    },
    updateVatNumber : function(e){
    this.setState({VatNumber : e.target.value});		
    },
    updateTaxNumber : function(e){
    this.setState({TaxNumber : e.target.value});		
    },

    componentWillUnmount: function() {
    this.serverRequest.abort();
    },

	render: function() {
        var navBarSyle= {
              marginBottom:0
            };
		return (	
                <div>		
				    <nav className="navbar navbar-default navbar-static-top" role="navigation" style={navBarSyle}>
	                    <NavHeader />
                        <NavMenu />
                    </nav>
                    <OrganizationDetails  Name={this.state.Name} TradingName={this.state.TradingName} RegistrationNumber={this.state.RegistrationNumber} VatNumber={this.state.VatNumber} TaxNumber={this.state.TaxNumber}
                                          updateName={this.updateName}  updateTradingName={this.updateTradingName} updateRegistrationNumber={this.updateRegistrationNumber} updateVatNumber={this.updateVatNumber} updateTaxNumber={this.updateTaxNumber} registerUserPOST= {this.registerUserPOST} />
                </div>       
            )
	}
});

var OrganizationDetails = React.createClass({
    
    render: function() {
        var navBarSyle= {
              marginBottom:0
            };
		return (
                <div id="page-wrapper">
	                <div className="row">
		                <div className="col-lg-12">
			                <h1 className="page-header">Organization Details</h1>
		                </div>                
	                </div> 
                    <div className="row">
	                    <div className="col-lg-4">
		                    <div className="panel panel-default">
			                    <div className="panel-heading">
				                    Details
			                    </div>
			                    <div className="panel-body">
				                    <form>
						                <div className="form-group">
                                            <label>Name</label>
                                            <input id="Name" className="form-control" placeholder="Name" value={this.props.Name} onChange={this.props.updateName} />
                                        </div>
						                <div className="form-group">
                                            <label>Trading Name</label>
                                            <input id="TradingName" className="form-control" placeholder="Trading Name" value={this.props.TradingName} onChange={this.props.updateTradingName}/>
                                        </div>
						                <div className="form-group">
                                            <label>Registration Number</label>
                                            <input id="RegistrationNumber" className="form-control" placeholder="Registration Number" value={this.props.RegistrationNumber}  onChange={this.props.updateRegistrationNumber}/>
                                        </div>
						                <div className="form-group">
                                            <label>Vat Number</label>
                                            <input id="VatNumber" className="form-control" placeholder="Vat Number" value={this.props.VatNumber} onChange={this.props.updateVatNumber}/>
                                        </div>
						                <div className="form-group">
                                            <label>Tax Number</label>
                                            <input id="TaxNumber" className="form-control" placeholder="Tax Number" value={this.props.TaxNumber} onChange={this.props.updateTaxNumber}/>
                                        </div>
					                </form>
			                    </div> 
                                <div className="panel-footer text-right">
                                    <button type="button" className="btn btn-primary" onClick={this.props.registerUserPOST} >Save</button>
                                </div>
		                    </div>
	                    </div>	
                    </div> 
                </div>
            )
	}

});
