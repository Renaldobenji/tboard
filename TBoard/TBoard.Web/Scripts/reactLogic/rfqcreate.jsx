var RFQRequest = React.createClass({

    getInitialState: function(){
        return { 
            QuoteType: "",
            ExpertiseSubCategoryID : 1
        };
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

    updateExpertiseSubCategoryID: function (e) {
        alert(e);
        this.setState({ ExpertiseSubCategoryID: e.target.value });
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
                            <RFQRequestDetail cancelClick={this.cancelClick} ExpertiseSubCategoryID={this.state.ExpertiseSubCategoryID} updateExpertiseSubCategoryID={this.updateExpertiseSubCategoryID}/>                           
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
                            this.props.quoteTypeClick('TRFQ')}>
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
                            this.props.quoteTypeClick('CRFQ')}>
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

   

    componentDidMount: function () {

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
                                    <input id="expiryDate" className="form-control" placeholder="Expiry date of quotation" />
                                </div>
                                <div className="form-group">
                                    <label>Quotation Details</label>
                                    <textarea className="form-control" rows="5" placeholder="Details for your quotation"></textarea>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <div className="text-right">
                                    <button type="button" onClick={this.props.cancelClick} className="btn btn-warning btn-lg">Cancel</button><span> </span>
                                    <button type="button" className="btn btn-primary btn-lg">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

                      
            )
}
});