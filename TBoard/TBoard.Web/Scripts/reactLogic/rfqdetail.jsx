var RfqDetail = React.createClass({

    getInitialState: function () {
        return {            
            ExpiryDate: "",
            RFQDetails: "",
            RFQReference: this.props.rfqreference
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
            }.bind(this)
        })
    },

    updateExpiryDate: function (e) {
        this.setState({ ExpiryDate: e.target.value });
    },

    updateRFQDetails: function (e) {
        this.setState({ RFQDetails: e.target.value });
    },

    updateRFQPost: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/RFQ/Update',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function (data) {
                alert("Success");
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/Update', status, err.toString());
            }.bind(this)
        });
    },

    cancelRFQPost: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/RFQ/Cancel',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function (data) {
                alert("Success");
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/Cancel', status, err.toString());
            }.bind(this)
        });
    },

    componentWillMount: function () {
        this.loadData();
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
			                        <h1 className="page-header">RFQ Detail({this.props.rfqreference})</h1>
		                        </div>
	                        </div>
                        <div className="row">
		                   <div className="col-md-9">
                            <RFQUpdateDetail updateRFQPost={this.updateRFQPost} ExpiryDate={this.state.ExpiryDate} RFQDetails={this.state.RFQDetails} updateExpiryDate={this.updateExpiryDate} updateRFQDetails={this.updateRFQDetails}/>
		                   </div>
                            <div className="col-md-3">
                                <RFQDetailActions cancelRFQPost={this.cancelRFQPost}/>
                            </div>
                        </div>
                    </div>
                  </div>
            )
	}
});

var RFQUpdateDetail = React.createClass({

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
                    <div className="panel-footer">
                        <div className="text-right">                                    
                            <button type="button" onClick={this.props.updateRFQPost} className="btn btn-primary btn-lg">Update</button>
                        </div>
                    </div>
                </div>
            )
}
});

var RFQDetailActions = React.createClass({

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
                            <button type="button" className="btn btn-outline btn-warning btn-lg btn-block" onClick={this.props.cancelRFQPost}>Cancel</button>
                        </div>                        
                    </div>                    
                </div>
            )
}
});