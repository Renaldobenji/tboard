var RfqBidScreen = React.createClass({

    getInitialState: function () {
        return {            
            ExpiryDate: "",
            RFQDetails: "",
            RFQReference: this.props.rfqreference,
            UserID: 1,
            MyLatestBidAmount: "",
            MyLatestBidDate: "",
            NewBidAmount : 0
        };
    },

    loadData: function () {
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
            url: 'api/RFQ/MyLatestQuote/' + this.props.rfqreference + '/' + this.state.UserID,
            success: function (data) {
                if (data.data.amount != null) {
                    this.setState({ MyLatestBidAmount: data.data.amount });
                }
                if (data.data.createdDate != null) {
                    this.setState({ MyLatestBidDate: data.data.createdDate });
                }
                this.setState({ RFQDetails: data.data.rfqDetails });
            }.bind(this)
        });
    },

    updateBidAmount: function (e) {
        this.setState({ NewBidAmount: e.target.value });
        console.log(this.state.NewBidAmount);
    },

    bidPost: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/RFQ/Quote',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function (data) {
                alert("Success");
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/Quote', status, err.toString());
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
                        <br /><br />              
                        <div className="row">
		                   <div className="col-md-9">
                            <RFQBidDetail ExpiryDate={this.state.ExpiryDate} RFQDetails={this.state.RFQDetails} bidPost={this.bidPost} updateBidAmount={this.updateBidAmount}/>
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
                                        <input type="text" className="form-control" value={this.props.NewBidAmount} onChange={this.props.updateBidAmount}/>
                                        <span className="input-group-addon">.00</span>
                                    </div>                                    </form>
                                </div>
								<div className="modal-footer">
									<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
									<button type="submit" className="btn btn-primary" onClick={this.props.bidPost}>Proceed</button>
								</div>
							</div>
						</div>
                    </div>
                <div className="bs-calltoaction bs-calltoaction-default" style={{"margin-top": "0px"}}>
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
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-7">                                        
                                My Bids
                            </div>                                   
                        </div>
                    </div>
                    <div className="panel-body text-center">
                         <h3>Bid Date</h3>
                         <h1 className="text-primary">R{this.props.MyLatestBidDate}</h1>
                    </div> 
                    <div className="panel-body text-center">     
                         <h3>My Highest Bid</h3>                             
                         <h1 className="text-primary">R{this.props.MyLatestBidAmount}</h1>                  
                    </div>                    
                </div>

                    
                </div>
            )
}
});