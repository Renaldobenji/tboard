var RfqBidScreen = React.createClass({

    getInitialState: function () {
        return {            
            ExpiryDate: "",
            RFQDetails: "",
            RFQReference: this.props.rfqreference,
            UserID: "",
            MyLatestBidAmount: 0,
            MyLatestBidDate: "N/A",
            NewBidAmount: 0,
            SupplyTime: "",
            DeliveryTime : ""
        };
    },

    loadData: function (userID) {
        $.ajax({
            url: 'api/RFQ/Detail/' + this.props.rfqreference,
            success: function (data) {
                if (data.data.expiryDate != null) {
                    this.setState({ ExpiryDate: data.data.expiryDate });
                }
                this.setState({ RFQDetails: data.data.rfqDetails });
            }.bind(this)
        });

        $.ajax({
            url: 'api/RFQ/MyLatestQuote/' + this.props.rfqreference + '/' + userID,
            success: function (data) {
                if (data.data == null)
                {
                    return;
                }
                if (data.data.amount != null) {
                    this.setState({ MyLatestBidAmount: data.data.amount });
                }
                if (data.data.createdDate != null) {
                    this.setState({ MyLatestBidDate: data.data.createdDate.substring(0, 10) });
                }                
            }.bind(this)
        });
    },

    updateBidAmount: function (e) {
        this.setState({ NewBidAmount: e.target.value });
        console.log(this.state.NewBidAmount);
    },

    updateSupplyTime: function (e) {
        this.setState({ SupplyTime: e });
        console.log(this.state.NewBidAmount);
    },

    updateDeliveryTime: function (e) {
        this.setState({ DeliveryTime: e });
        console.log(this.state.NewBidAmount);
    },

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var loggedIn = tokens.IsLoggedIn();
        if (loggedIn == true) {
            var decodedToken = tokens.getJWTToken();
            this.setState({ UserID: decodedToken.UserID });
            this.loadData(decodedToken.UserID);
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
                        <br /><br />              
                        <div className="row">
		                   <div className="col-md-9">
                            <RFQBidDetail UserID={this.state.UserID} RFQReference={this.state.RFQReference} ExpiryDate={this.state.ExpiryDate} RFQDetails={this.state.RFQDetails} bidPost={this.bidPost} updateBidAmount={this.updateBidAmount} updateSupplyTime={this.updateSupplyTime} updateDeliveryTime={this.updateDeliveryTime}/>
		                   </div> 
                            <div className="col-md-3">
                            <RFQMyDids MyLatestBidAmount={this.state.MyLatestBidAmount} MyLatestBidDate={this.state.MyLatestBidDate}/>
                            </div>                           
                        </div>                        
                    </div>
                  </div>
            )
	}
});

var RFQBidDetail = React.createClass({

    componentDidMount: function () {
        $('#SupplyTime').datetimepicker();
        $('#DeliveryTime').datetimepicker();
    },
   
    WillYouPOST: function () {
        var sd = $('#SupplyTimeControl').val();
        var ds = $('#DeliveryTimeControl').val();
        var bidAmount = $('#bidAmount').val();
        this.props.updateDeliveryTime(ds);
        this.props.updateSupplyTime(sd);

        var dataPost = {
            RFQReference: this.props.RFQReference,
            UserID: this.props.UserID,
            NewBidAmount: bidAmount,
            SupplyTime  : sd,
            DeliveryTime  : ds
        };        

        console.log('POSTING FORM');
        $.ajax({
            url: 'api/RFQ/Quote',
            type: 'POST',
            dataType: 'json',
            data: dataPost,
            cache: false,
            success: function (data) {
                this.setState({ MyLatestBidAmount: data.data.amount });
                this.setState({ MyLatestBidDate: data.data.createdDate.substring(0, 10) });
                alert("Success");
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/Quote', status, err.toString());
            }.bind(this)
        });
    },

    wait: function (ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
            end = new Date().getTime();
        }
    },

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                <div>
                    <div className="modal fade" id="bidModal" tabindex="-1" role="dialog" aria-labelledby="bidModalLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">									
									<h4 className="modal-title" id="myModalLabel">Bid</h4>
								</div>
								<div className="modal-body">
                                    <form role="form">									
                                    <label>Amount</label>
                                    <div className="form-group input-group">                                        
                                        <span className="input-group-addon">R</span>
                                        <input id="bidAmount" type="text" className="form-control" placeholder="Amount" value={this.props.NewBidAmount} onChange={this.props.updateBidAmount}/>
                                        <span className="input-group-addon">.00</span>
                                    </div> 
                                        <label>Supply Time</label>
                                        <div className="form-group">
                                            <div className='input-group date' id='SupplyTime'>
                                                <input type='text' id='SupplyTimeControl' className="form-control" placeholder="Supply Time"/>
                                                <span className="input-group-addon">
                                                    <span className="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </div>
                                        <label>Delivery Time</label>
                                        <div className="form-group">
                                            <div className='input-group date' id='DeliveryTime'>
                                                <input type='text' id='DeliveryTimeControl' className="form-control" placeholder="Delivery Time"/>
                                                <span className="input-group-addon">
                                                    <span className="glyphicon glyphicon-calendar"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
								<div className="modal-footer">
									<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
									<button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.WillYouPOST}>Proceed</button>
								</div>
							</div>
						</div>
                    </div>
                <div className="bs-calltoaction bs-calltoaction-default" style={{ "marginTop": "0px" }}>
                    <div className="row">
                        <div className="col-md-9 cta-contents">
                            <h1 className="cta-title">Its a Call To Action</h1>
                            <div className="cta-desc">
                                <label>Expiry Date</label>
                                <p>{this.props.ExpiryDate}</p>

                                <label>RFQ Detail</label>
                                <p>{this.props.RFQDetails}</p>                                
                            </div>
                        </div>
                        <div className="col-md-3">
                            <button type="button" className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#bidModal">Go for it!</button>
                        </div>
                     </div>
                </div> 
                </div>   
            )
}
});

var RFQMyDids = React.createClass({

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (
                <div>
                <div className="panel panel-default">                    
                    <div className="panel-body text-center">
                         <h3>Bid Date</h3>
                         <h1 className="text-primary">{this.props.MyLatestBidDate}</h1>
                         <h3>My Highest Bid</h3>
                         <h1 className="text-primary">R{this.props.MyLatestBidAmount}</h1>        
                    </div>                                      
                </div>

                    
                </div>
            )
}
});