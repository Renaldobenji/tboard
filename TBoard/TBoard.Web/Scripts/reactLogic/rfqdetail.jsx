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
			                        <h1 className="page-header">RFQ Detail ({this.props.rfqreference})</h1>
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
                        <div className="row">
                            <RFQBidQuotes RFQReference={this.state.RFQReference} />
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

var RFQBidQuotes = React.createClass({

     getInitialState: function () {
        return { data: [] }
    },

    loadData: function () {
        $.ajax({
            url: 'api/RFQ/QuoteBids/' + this.props.RFQReference,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this)
        })
    },

    componentWillMount: function () {
        this.loadData();
    },

    componentDidMount: function () {
        Sortable.create(simpleList, {
           
        });
    },

    render: function () {

        function oemFormatter(cell, row) {
            return <div> {row.oem.toString()} </div>;
        }

        return (
            <div>
			<div className="col-lg-8">
				<BootstrapTable data={this.state.data} striped={true} hover={true}>
                  <TableHeaderColumn isKey={true} dataField="CreatedDate">CreatedDate</TableHeaderColumn>
                  <TableHeaderColumn dataField="FirstName">FirstName</TableHeaderColumn>
                  <TableHeaderColumn dataField="Surname">Surname</TableHeaderColumn>
                  <TableHeaderColumn dataField="Amount">Amount</TableHeaderColumn>
                  <TableHeaderColumn dataField="SupplyTime">SupplyTime</TableHeaderColumn>
                  <TableHeaderColumn dataField="DeliveryTime">DeliveryTime</TableHeaderColumn>
                  <TableHeaderColumn dataField="name">Company Name</TableHeaderColumn>                  
                 <TableHeaderColumn dataFormat={oemFormatter}>OEM</TableHeaderColumn>  
				</BootstrapTable>
			</div>
            <div className="col-lg-4">
             <ul id="simpleList" className="list-group">
                    <li className="list-group-item">This is <a href="http://rubaxa.github.io/Sortable/">Sortable</a></li>
                    <li className="list-group-item">It works with Bootstrap...</li>
                    <li className="list-group-item">...out of the box.</li>
                    <li className="list-group-item">It has support for touch devices.</li>
                    <li className="list-group-item">Just drag some elements around.</li>
                </ul>
            </div>
            </div>
		)
    }

});