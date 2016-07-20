﻿var RfqDetail = React.createClass({

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
         return {
             data: [],
             OrderList: "",
             RFQReference: this.props.RFQReference,
             CurrentOrganizationID : 0
         }
    },

    loadData: function () {
        $.ajax({
            url: 'api/RFQ/QuoteBids/' + this.props.RFQReference,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this)
        })
    },

    onClickShow: function () {    
        var list = "";
        $("#simpleList li").each(function () {
            list = list.concat($(this)[0].id + ",")
        });
        this.setState({ OrderList: list });

        var data0 = { OrderList: list, RFQReference: this.props.RFQReference };
        
        $.ajax({
            url: 'api/RFQ/QuoteBids/Order',
            type: 'POST',
            dataType: 'json',
            data: data0,
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/QuoteBids/Order', status, err.toString());
            }.bind(this)
        });
    },

    componentWillMount: function () {
        this.loadData();
    },

    componentDidMount: function () {
        Sortable.create(simpleList, {
            draggable: ".list-group-item"
        });

        $("#jRate").jRate({
            count: 5,
            min: 1,
            max: 5,
            onChange: function (rating) {
                $('#rating').val(rating);
            }
        });
    },

    ratePostClick: function () {

        alert($('#rating').val());
        alert($('#OrganizationID').val());
        alert($('#ratingComment').val());

        var data0 = { ownerType: "ORG", owningID: $('#OrganizationID').val(), rating1: $('#rating').val(), comment: $('#ratingComment').val() };

        $.ajax({
            url: 'api/Rating',
            type: 'POST',
            dataType: 'json',
            data: data0,
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Rating', status, err.toString());
            }.bind(this)
        });
    },

    
    render: function () {

        function oemFormatter(cell, row) {
            return <div> {row.oem.toString()} </div>;
        }
        
        function actionsRateFormatter(cell, row) {
            return <ActionsRate OrganizationID={row.OrganizationID}/>;
        }

        return (
            <div> 
             <div className="modal fade" id="myRateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			        <div className="modal-dialog">
				        <div className="modal-content">
					        <div className="modal-header">
						        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
						        <h4 className="modal-title" id="myModalLabel">Rate Supplier</h4>
					        </div>
					        <div className="modal-body">
                                    <div id="jRate"></div>
                                    <input type="hidden" id="rating"></input>
                                    <div className="form-group">
                                    <textarea  id="ratingComment" className="form-control" rows="5" placeholder="Rate Supplier"></textarea>
                                    </div>

					        </div>
					        <div className="modal-footer">
						        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
						        <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.ratePostClick}>Rate</button>
					        </div>
				        </div>
			        </div>
             </div>    
			<div className="col-lg-9">
                <button className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    Order Quotes
                </button>
              
				<BootstrapTable data={this.state.data} striped={true} hover={true} tableStyle={{margin:0}}>
                  <TableHeaderColumn isKey={true} dataField="CreatedDate">CreatedDate</TableHeaderColumn>
                  <TableHeaderColumn dataField="FirstName">FirstName</TableHeaderColumn>
                  <TableHeaderColumn dataField="Surname">Surname</TableHeaderColumn>
                  <TableHeaderColumn dataField="Amount">Amount</TableHeaderColumn>
                  <TableHeaderColumn dataField="SupplyTime">SupplyTime</TableHeaderColumn>
                  <TableHeaderColumn dataField="DeliveryTime">DeliveryTime</TableHeaderColumn>
                  <TableHeaderColumn dataField="name">Company Name</TableHeaderColumn>                  
                 <TableHeaderColumn dataFormat={oemFormatter}>OEM</TableHeaderColumn> 
                 <TableHeaderColumn dataFormat={actionsRateFormatter}>Actions</TableHeaderColumn>        
				</BootstrapTable>

                <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
								<h4 className="modal-title" id="myModalLabel">Order Quote</h4>
							</div>
							<div className="modal-body">
								<ul id="simpleList" className="list-group" draggable="true">
                                    <li id="Amount" className="list-group-item">                                    <span className="drag-handle">☰ </span>Cost</li>
                                    <li id="SupplyTime" className="list-group-item">                                    <span className="drag-handle">☰ </span>Supply Time</li>
                                    <li id="DeliveryTime"className="list-group-item">                                    <span className="drag-handle">☰ </span>Delivery Time</li>                                    
                                    <li id="oem" className="list-group-item">                                    <span className="drag-handle">☰ </span>OEM</li>                                    
								</ul>						
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
								<button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.onClickShow}>Order</button>
							</div>
						</div>
					</div>
                </div>
			</div>            
            </div>
		)
    }

});

var ActionsRate = React.createClass({

   ratePostClick: function () {
       // Explicitly focus the text input using the raw DOM API.
       //alert(this.props.reference);
       $('input[type="hidden"][id="OrganizationID"]').remove();
       var $hiddenInput = $('<input/>', { type: 'hidden', id: "OrganizationID", value: this.props.OrganizationID });
       $hiddenInput.appendTo($('#myRateModal'));     
       $('#myRateModal').modal('show');

   },

    render: function () { 

        return (
                 <div>  
                                              
				    <button className="btn btn-outline btn-warning btn-sm" onClick={this.ratePostClick}>Rate</button>
                 </div>
		)
}
});