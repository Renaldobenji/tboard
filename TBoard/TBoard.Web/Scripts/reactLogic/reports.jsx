var ReportFilter = React.createClass({

    getInitialState: function () {
        return {
            UserID: "",
            data: [],
            percent: -1,
            autoIncrement: true,
            intervalTime: 200
        };

    },

    startWithAutoIncrement: function () {
        this.setState({
            percent: 0,
            autoIncrement: true,
            intervalTime: (Math.random() * 1000)
        });
    },

    stopWithAutoIncrement: function () {
        this.setState({
            percent: 0,
            autoIncrement: false,
            intervalTime: 0
        });
    },

    loadData: function () {
        this.startWithAutoIncrement();
        var startDate = $('#reportStartDate').val();
        var endDate = $('#reportEndDate').val();

        var dataPost = {
            userID: this.state.UserID,
            status: "ACCEPTED",
            startDate: startDate,
            endDate: endDate
        };

        $.ajax({
            url: 'api/RFQ/GetQuoteHistory',
            type: 'POST',
            dataType: 'json',
            data: dataPost,
            cache: false,
            error: function (xhr, status, err) {
                alert(err)
            },
            success: function (data) {
                this.stopWithAutoIncrement();
                this.setState({ data: data.data });

            }.bind(this)
        })
    },

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ UserID: decodedToken.UserID });
    },

    componentDidMount: function () {
        $('#reportStartDate').datetimepicker();
        $('#reportEndDate').datetimepicker();
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
                    <ProgressBar percent={this.state.percent}
                                 autoIncrement={this.state.autoIncrement}
                                 intervalTime={this.state.intervalTime} spinner={false} />       
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
                                            <div className='input-group date' >
                                            <input type='text' id='reportStartDate' className="form-control" placeholder="Start Date" />
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-calendar"></span>
                                            </span>
                                             </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className='input-group date'>
                                            <input type='text'  id='reportEndDate' className="form-control" placeholder="End Date" />
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-calendar"></span>
                                            </span>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                             <button type="button" className="btn btn-primary btn-block" onClick={this.loadData}>View Report</button>
                                        </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                            <div>
                                <ExpenditureList data={this.state.data}/>
                            </div>
                        </div>
                        </div>
            )
    }
});

var ExpenditureList = React.createClass({

    render: function () {      

        function actionsFormatter(cell, row) {
            return <Actions reference={row.reference}/>;
        }

        return (
			<div className="col-lg-12">	
				<BootstrapTable data={this.props.data} striped={true} hover={true} pagination={true} search={true}>
                  <TableHeaderColumn isKey={true} dataField="reference">Reference</TableHeaderColumn>
                  <TableHeaderColumn dataField="createdDate">Create Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="quoteStatusDateTime">Quote Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="amount">Amount</TableHeaderColumn>       
				</BootstrapTable>				
			</div>
		)
    }
});

