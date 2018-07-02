var RfqPay = React.createClass({

    getInitialState: function () {
        return {            
            ExpiryDate: "",
            RFQDetails: "",
            RFQReference: this.props.rfqreference,
            UserID: "",
            Status: "",
            BankName: "",
            AccountNumber: "",
            BranchCode: ""
        };
    },

    loadData: function () {
        $.ajax({
            url: 'api/RFQ/Detail/' + this.props.rfqreference,
            success: function (data) {
                if (data.data.expiryDate != null)
                    {
                    this.setState({ ExpiryDate: data.data.expiryDate });
                }
                this.setState({ RFQDetails: data.data.rfqDetails });
                this.setState({ Status: data.data.status });
            }.bind(this)
        })

        $.ajax({
            url: 'api/RFQ/BankDetails',
            success: function (data) {
                var array = data.split(',');
                this.setState({ BankName: array[0] });
                this.setState({ AccountNumber: array[1] });
                this.setState({ BranchCode: array[2] });
            }.bind(this)
        })
    },

    componentWillMount: function () {    

        var tokens = new TboardJWTToken();
        var loggedIn = tokens.IsLoggedIn();
        if (loggedIn == true) {
            var decodedToken = tokens.getJWTToken();
            this.setState({ UserID: decodedToken.UserID });
            this.loadData();
        }
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
                    <div id="page-wrapper">
	                        <div className="row">
		                        <div className="col-lg-12">
			                        <h1 className="page-header">RFQ Payment Information ({this.props.rfqreference})</h1>
		                        </div>
	                        </div>
                        <div className="row">
		                   <div className="col-md-9">
                            <RFQPayDetail  ExpiryDate={this.state.ExpiryDate} RFQDetails={this.state.RFQDetails} updateExpiryDate={this.updateExpiryDate} updateRFQDetails={this.updateRFQDetails}/>
		                   </div>
                            <div className="col-md-3">
                                <RFQPaymentActions reference={this.props.rfqreference} userid={this.state.UserID} />
                            </div>                           
                        </div> 
                        <div className="row">
		                   <div className="col-md-9">
                            <RFQPayBankInformation BankName = {this.state.BankName} AccountNumber = {this.state.AccountNumber} BranchCode = {this.state.BranchCode} reference={this.props.rfqreference}/>
		                   </div>
                        </div>                         
                      </div>                    
                  </div>
            )
	}
});

var RFQPayDetail = React.createClass({

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-7">                                        
                                RFQ Details
                            </div>                                   
                        </div>
                    </div>
                    <div className="panel-body">                                
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input id="expiryDate" className="form-control" value={this.props.ExpiryDate} onChange={this.props.updateExpiryDate} placeholder="Expiry date of quotation" />
                        </div>
                        <div className="form-group">
                            <label>Quotation Details</label>
                            <textarea className="form-control" rows="5" value={this.props.RFQDetails} onChange={this.props.updateRFQDetails} placeholder="Details for your quotation"></textarea>
                        </div>
                    </div>                    
                </div>
            )
}
});

var RFQPayBankInformation = React.createClass({

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-7">                                        
                                Banking Information
                            </div>                                   
                        </div>
                    </div>
                    <div className="panel-body">                                
                        <div>Bank:                          <h4 className="text-primary">{this.props.BankName}</h4></div>                           
                        <div>Account Number:                                                 <h4 className="text-primary">{this.props.AccountNumber}</h4></div>   
                        <div>Branch Code:                                                 <h4 className="text-primary">{this.props.BranchCode}</h4></div>
                        <div>Reference:                                                 <h4 className="text-primary">{this.props.reference}</h4></div>                                                                                                        
                    </div>                    
                </div>
            )
}
});

var RFQPaymentActions = React.createClass({

    handleClick: function () {
        
        var form = {
            reference: this.props.reference,
            userid: this.props.userid
        }

        console.log('POSTING FORM');
        $.ajax({
            url: 'api/RFQ/PayQuote',
            type: 'POST',
            dataType: 'json',
            data: form,
            cache: false,
            success: function (data) {
                var opts = {
                    title: "Success",
                    text: "Quote Successfully Paid.",
                    addclass: "stack-bottomright",
                    type: "success"
                };
                new PNotify(opts);
                routie('dashboard');
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/PayQuote', status, err.toString());
            }.bind(this)
        });
    },

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
                            <button type="button" onClick={this.handleClick} className="btn btn btn-primary btn-lg btn-block">Payment Complete</button>
                        </div>                        
                    </div>                    
                </div>
            )
}
});
