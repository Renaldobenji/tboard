var ISO9001QualityManagement = React.createClass({

    getInitialState: function () {
        return {
            FinanceInformation: [],
            DocumentRequirements: [],
            OrganizationID: "",
            UserID: "",
            qualityManagementSystemCertified: "NO",
            qualityManagementSystem: "NO",
            qualityPolicy: "NO",
            internalAuditReports: "NO",
            managementReviewMeetingMinutes: "NO",
            warrantyManagementProcess: "NO",
            guaranteeOnProducts: "NO",
            durationOfGuarantee: "PleaseSelect",
            
            MetaDataNames: new Array("QualityManagementSystemCertified", "QualityManagementSystem", "QualityPolicy", "InternalAuditReports"
                , "ManagementReviewMeetingMinutes", "WarrantyManagementProcess", "GuaranteeOnProducts","DurationOfGuarantee"),

        };
    },

    fetchQuestionMetaData: function (orgID) {

        var request = {}
        request.MetaDataNames = this.state.MetaDataNames;
        request.OwnerID = orgID

        $.ajax({
            url: 'api/Organization/MetaData',
            dataType: 'json',
            cache: false,
            type: 'POST',
            data: JSON.stringify(request),
            contentType: 'application/json',
            success: function (data) {
                if (data.length > 0) {

                    this.setState({ qualityManagementSystemCertified: data.find(metaData => metaData.metaDataName === "QualityManagementSystemCertified").metaDataValue });
                    this.setState({ qualityManagementSystem: data.find(metaData => metaData.metaDataName === "QualityManagementSystem").metaDataValue });
                    this.setState({ qualityPolicy: data.find(metaData => metaData.metaDataName === "QualityPolicy").metaDataValue });
                    this.setState({ internalAuditReports: data.find(metaData => metaData.metaDataName === "InternalAuditReports").metaDataValue });
                    this.setState({ managementReviewMeetingMinutes: data.find(metaData => metaData.metaDataName === "ManagementReviewMeetingMinutes").metaDataValue });
                    this.setState({ warrantyManagementProcess: data.find(metaData => metaData.metaDataName === "WarrantyManagementProcess").metaDataValue });
                    this.setState({ guaranteeOnProducts: data.find(metaData => metaData.metaDataName === "GuaranteeOnProducts").metaDataValue });
                    this.setState({ durationOfGuarantee: data.find(metaData => metaData.metaDataName === "DurationOfGuarantee").metaDataValue });
                }

            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Organization/MetaData', status, err.toString());
            }.bind(this)
        });
    },

    fetchDocumentRequirements: function (orgID) {
        $.ajax({
            url: 'api/Requirement/DOCUMENTREQUIREMENT/ORG/' + orgID,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ DocumentRequirements: data });

                if (data.length > 0) {
                    var opts = {
                        title: "Document Requirement",
                        text: "Please resolve the Outstanding Document Requirements.",
                        addclass: "stack-bottomright",
                        type: "error",
                        nonblock: {
                            nonblock: true
                        }
                    };
                    new PNotify(opts);
                }

            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Requirements/Document/ORG/', status, err.toString());
            }.bind(this)
        });
    },


    ISO9001InfoPOST: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Organization/MetaData/ISO9001Info',
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
                console.error('api/Organization/MetaData/ISO9001', status, err.toString());
            }.bind(this)
        });
    },

    qualityManagementSystemCertified: function (e) {
        this.setState({ qualityManagementSystemCertified: e.target.value });
        console.log(this.state.qualityManagementSystemCertified);
    },

    qualityManagementSystem: function (e) {
        this.setState({ qualityManagementSystem: e.target.value });
        console.log(this.state.qualityManagementSystem);
    },

    qualityPolicy: function (e) {
        this.setState({ qualityPolicy: e.target.value });
        console.log(this.state.qualityPolicy);
    },

    internalAuditReports: function (e) {
        this.setState({ internalAuditReports: e.target.value });
        console.log(this.state.internalAuditReports);
    },

    managementReviewMeetingMinutes: function (e) {
        this.setState({ managementReviewMeetingMinutes: e.target.value });
        console.log(this.state.managementReviewMeetingMinutes);
    },

    warrantyManagementProcess: function (e) {
        this.setState({ warrantyManagementProcess: e.target.value });
        console.log(this.state.warrantyManagementProcess);
    },

    guaranteeOnProducts: function (e) {
        this.setState({ guaranteeOnProducts: e.target.value });
        console.log(this.state.guaranteeOnProducts);
    },

    durationOfGuarantee: function (e) {
        this.setState({ durationOfGuarantee: e.target.value });
        console.log(this.state.durationOfGuarantee);
    },
    

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();

        this.setState({ OrganizationID: decodedToken.OrganizationID });
        this.setState({ UserID: decodedToken.UserID });
        this.fetchQuestionMetaData(decodedToken.OrganizationID);

    },

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.OrganizationID !== prevProps.OrganizationID) {
            this.fetchDocumentRequirements(this.state.OrganizationID);
        }
    },

    componentDidMount: function () {
        this.fetchDocumentRequirements(this.state.OrganizationID);
    },

    render: function () {
        var navBarSyle = {
            marginBottom: 0
        };

        var overflowStyle = {
            overflow: "hidden",
            width: "auto"
        };

        var checkBox = {
            height: "20px",
            width: "20px",
            verticalAlign: "middle",
            marginTop: "-2px",
            marginLeft: "10px",
        }

        var lastTR = {
            fontWeight: "bold",
            padding: "20px"
        }

        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top" role="navigation" style={navBarSyle}>
                    <NavHeader />
                    <NavMenu />
                </nav>
                <div id="page-wrapper"  >
                    <div className="row">
                        <div className="col-lg-10">
                            <h1 className="page-header">
                                Finance Information
                            </h1>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-lg-10">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    Please complete the following
                                </div>
                                <div className="panel-body" style={overflowStyle}>
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Question</th>
                                                    <th>Answer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Is your company ISO 9001 "Quality Management System" Certified? Upload ISO 9001 Certificate?</td>
                                                    <td><select value={this.state.qualityManagementSystemCertified} className="form-control" onChange={this.qualityManagementSystemCertified}><option>NO</option><option>YES</option></select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Does your company have a Quality Management System? Upload proof of your Quality Management System?</td>
                                                    <td>
                                                        <select value={this.state.qualityManagementSystem} className="form-control" onChange={this.qualityManagementSystem}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Does your company have a Quality Policy?</td>
                                                    <td>
                                                        <select value={this.state.qualityPolicy} className="form-control" onChange={this.qualityPolicy}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Does your company have Internal Audit Reports/Results? Upload your company's Internal Audit Reports/Results</td>
                                                    <td>
                                                        <select value={this.state.internalAuditReports} className="form-control" onChange={this.internalAuditReports}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>Does your company have Management Review Meeting Minutes? Upload a copy of your Management Review Meeting Minutes</td>
                                                    <td>
                                                        <select value={this.state.managementReviewMeetingMinutes} className="form-control" onChange={this.managementReviewMeetingMinutes}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>Does your company have a dedicated Warranty Management Process?</td>
                                                    <td>
                                                        <select value={this.state.warrantyManagementProcess} className="form-control" onChange={this.warrantyManagementProcess}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>Does your company provide a guarantee on your products or services?</td>
                                                    <td>
                                                        <select value={this.state.guaranteeOnProducts} className="form-control" onChange={this.guaranteeOnProducts}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td>If your company provides guarantees on products or services, please select the duration of your guarantees</td>
                                                    <td>
                                                        <select value={this.state.durationOfGuarantee} className="form-control" onChange={this.durationOfGuarantee}>>
                                                            <option>Please Select</option>
                                                            <option>3 Months</option>
                                                            <option>6 Months</option>
                                                            <option>12 Months</option>
                                                            <option>24 Months and more</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2" style={lastTR}>I confirm that the above information and documents are correct and valid
                                                        <input style={checkBox} type="checkbox"></input>
                                                    </td>
                                                    <td>
                                                        <button type="button" className="btn btn-primary" onClick={this.ISO9001InfoPOST}>Save</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <DocumentRequirementsList OrgID={this.props.OrganizationID} DocumentRequirements={this.state.DocumentRequirements} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});