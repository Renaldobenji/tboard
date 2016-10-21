var ReportFilter = React.createClass({

    componentDidMount: function () {
        $('#reportStartDate').datetimepicker();
        $('#reportEndDate').datetimepicker();

        /*var sd = $('#SupplyTimeControl').val();
        var ds = $('#DeliveryTimeControl').val();*/
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
			                        <h1 className="page-header">Reports</h1>
		                        </div>
	                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        Date Selection
                                    </div>
                                    <div className="panel-body text-center">
                                        <div className="col-lg-4">
                                            <div className='input-group date' id='reportStartDate'>
                                            <input type='text' id='SupplyTimeControl' className="form-control" placeholder="Start Date" />
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-calendar"></span>
                                            </span>
                                             </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className='input-group date' id='reportEndDate'>
                                            <input type='text' id='SupplyTimeControl' className="form-control" placeholder="End Date" />
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-calendar"></span>
                                            </span>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                             <button type="button" className="btn btn-primary btn-block">View Report</button>
                                        </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                        </div>
                        </div>
            )
    }
});

