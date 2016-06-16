﻿var RFQRequest = React.createClass({	
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
			                    <h1 className="page-header">Request for Quotation</h1>
		                    </div>                
	                    </div>  
                        <br/><br /><br />
                        <RFQRequestType />  
                        <RFQRequestDetail />             
                    </div>
                </div>

                      
            )
	}
});


var RFQRequestType = React.createClass({	
    render: function() {

        var navBarSyle= {
            marginBottom:0
        };
        return (	
                <div className="row">
		            <div className="col-lg-3 col-md-6 col-md-offset-1">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">1</div>
                                        <div>Request For Quotation</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">Select</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
		            </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-green">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">2</div>
                                        <div>Timed Quotation</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">Select</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="panel panel-yellow">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="fa fa-comments fa-5x"></i>
                                    </div>
                                    <div className="col-xs-9 text-right">
                                        <div className="huge">3</div>
                                        <div>Closed Timed Quotation</div>
                                    </div>
                                </div>
                            </div>
                            <a href="#">
                                <div className="panel-footer">
                                    <span className="pull-left">Select</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div> 

                      
            )
}
});

var RFQRequestDetail = React.createClass({	
    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        return (	
                <div className="row">
		            <div className="col-md-7 col-md-offset-2">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                               <div className="row">
                                    <div className="col-xs-7">                                        
                                        <h3>RFQ Details</h3>
                                    </div>                                   
                               </div>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label>Category</label>
                                    <input className="form-control" placeholder="Quote Required For:"/>                                   
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input id="expiryDate" className="form-control" placeholder="Expiry date of quotation" />
                                </div>
                                <div className="form-group">
                                    <label>Quotation Details</label>
                                    <textarea className="form-control" rows="5" placeholder="Details for your quotation"></textarea>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <div className="text-right">
                                    <button type="button" className="btn btn-primary btn-lg">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

                      
            )
}
});