var RFQRequest = React.createClass({

    getInitialState: function(){
        return { 
            QuoteType: "",
            ExpertiseSubCategoryID: 1,
            ExpiryDate: "",
            RFQDetails: "",
            UserID: "",
            OrganizationID : ""
        };
    },

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ OrganizationID: decodedToken.OrganizationID });
        this.setState({ UserID: decodedToken.UserID });        
    },

    componentDidMount: function () {
        $('#step2').hide();
    },

    quoteTypeClick: function (e) {        
        this.setState({ QuoteType: e });
        $('#step1').hide();
        $('#step2').show();
    },

    cancelClick: function (){
        $('#step1').show();
        $('#step2').hide();
    },

    updateExpiryDate: function (e) {        
        this.setState({ ExpiryDate: e.target.value });
    },

    updateRFQDetails: function (e) {
        this.setState({ RFQDetails: e.target.value });
    },

    PostRFQ: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/RFQ/Post',
            type: 'POST',
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function (data) {
                var opts = {
                    title: "Success",
                    text: "That thing that you were trying to do worked.",
                    addclass: "stack-bottomright",
                    type: "success",
                    nonblock: {
                        nonblock: true
                    }
                };
                new PNotify(opts);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/Post', status, err.toString());
            }.bind(this)
        });
    },

    updateExpertiseSubCategoryID: function (e,a) {        
        this.setState({ ExpertiseSubCategoryID: e });
        this.setState({ ExpiryDate: a });
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
			                    <h1 className="page-header">Request for Quotation </h1>
		                    </div>                
	                    </div>  
                        <br/><br /><br />
                        <div id="step1">
                            <RFQRequestType quoteTypeClick={this.quoteTypeClick} />  
                        </div>
                        <div id="step2">                           
                            <RFQRequestDetail QuoteType={this.state.QuoteType} UserID={this.state.UserID}  OrganizationID={this.state.OrganizationID}  PostRFQ={this.PostRFQ} ExpiryDate={this.state.ExpiryDate} RFQDetails={this.state.RFQDetails} updateExpiryDate={this.updateExpiryDate} updateRFQDetails={this.updateRFQDetails} cancelClick={this.cancelClick} ExpertiseSubCategoryID={this.state.ExpertiseSubCategoryID} updateExpertiseSubCategoryID={this.updateExpertiseSubCategoryID}/>                           
                        </div>
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
                        <a onClick={() => this.props.quoteTypeClick('RFQ')}>
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
                            <div className="panel-footer">
                                <span className="pull-left">Select</span>
                                <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        </a>
		            </div>
                    <div className="col-lg-3 col-md-6">
                        <a onClick={() =>
                            this.props.quoteTypeClick('OTT')}>
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

                                <div className="panel-footer">
                                    <span className="pull-left">Select</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>

                        </div>
                            </a>
                        </div>
                    <div className="col-lg-3 col-md-6">
                        <a onClick={() =>
                            this.props.quoteTypeClick('CTT')}>
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

                                <div className="panel-footer">
                                    <span className="pull-left">Select</span>
                                    <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                    <div className="clearfix"></div>
                                </div>

                        </div>
                       </a>
                    </div>
                </div> 

                      
            )
}
});

var RFQRequestDetail = React.createClass({

    buttonClick: function () {
        var userCat = $('#category').val();
        var datePicker = $('#expiryDate').val();
        var rfqDetails = $('#rfqDetails').val();
        
        var form = {
            QuoteType : this.props.QuoteType,
            ExpertiseSubCategoryID : userCat,
            ExpiryDate : datePicker,
            RFQDetails: rfqDetails,
            UserID : this.props.UserID,
            OrganizationID : this.props.OrganizationID
        }        
        
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/RFQ/Post',
            type: 'POST',
            dataType: 'json',
            data: form,
            cache: false,
            success: function (data) {
                var opts = {
                    title: "Success",
                    text: "That thing that you were trying to do worked.",
                    addclass: "stack-bottomright",
                    type: "success"                    
                };
                new PNotify(opts);
                routie('dashboard');
            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/RFQ/Post', status, err.toString());
            }.bind(this)
        });
    },

   
    componentDidMount: function () {

        // Turn input element into a pond
        $('#fileupload').filepond();

        // Turn input element into a pond with configuration options
        $('#fileupload').filepond({
            allowMultiple: true,
            server: 'Upload/PostRFQForm?orgID=' + this.props.OrganizationID
        });

        // Set allowMultiple property to true
        $('#fileupload').filepond('allowMultiple', true);

        // Listen for addfile event
        $('#fileupload').on('FilePond:addfile', function (e) {
            const inputElement = document.querySelector('input[type="file"]');
            // create the FilePond instance
            const pond = FilePond.create(inputElement);

            console.log('file added event', e);
        });
       
        $('#expiryDate').datetimepicker();

        function formatRepo (repo) {
            if (repo.loading) return repo.text;

            var markup = "<label>" + repo.CategoryName + "-" + repo.SubCategoryName +"</label>";
           
            return markup;
        }

        function formatRepoSelection (repo) {
            return repo.CategoryName || repo.SubCategoryName;
        }

        $("#category").select2({
            placeholder: "Search for an Item",
            ajax: {
                url: "api/ExpertiseCategory/GetExpertiseLike",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (data) {
                    return {
                        results: $.map(data.items, function (item) {
                            return {
                                text: item.CategoryName + "-" + item.SubCategoryName,
                                id: item.ExpertiseSubCategoryID
                            }
                        })
                    };
                },
                cache: true
            },           
            minimumInputLength: 1            
        });
    },

    render: function() {

        var navBarSyle= {
            marginBottom:0
        };

        var uploadSyle = {
            'font-size': '8pt'
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
                                    <select id="category" name="category" className="form-control" value={this.props.ExpertiseSubCategoryID} onChange={this.props.updateExpertiseSubCategoryID}>
                                       
                                    </select>                                 
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date</label>                                    
                                    <div className='input-group date' id='SupplyTime' style={{display: "block"}}>
                                        <input type='text' id='expiryDate' className="form-control" placeholder="Expiry Date" />
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Quotation Details</label>
                                    <textarea id="rfqDetails" className="form-control" rows="5" value={this.props.RFQDetails} onChange={this.props.updateRFQDetails} placeholder="Details for your quotation"></textarea>
                                </div>
                                <div className="form-group" style={{ uploadSyle }}>
                                 <input id="fileupload" type="file" data-file-metadata-hello={ this.props.OrganizationID }
                                        className="filepond"
                                        name="filepond"></input>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <div className="text-right">
                                    <button type="button" onClick={this.props.cancelClick} className="btn btn-warning btn-lg">Cancel</button><span> </span>
                                    <button type="button" onClick={this.buttonClick} className="btn btn-primary btn-lg">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            )
}
});