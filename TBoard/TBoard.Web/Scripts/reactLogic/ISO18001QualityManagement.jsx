var ISO18001QualityManagement = React.createClass({

    getInitialState: function () {
        return {
            FinanceInformation: [],
            DocumentRequirements: [],
            OrganizationID: "",
            UserID: "",
            occupationalHealthAndSafetyCertified: "NO",
            provideCopyOfCompayRiskAssessmentRecords: "NO",
            haveAnEvacuationPlan: "NO",
            companyDisplayCopyofOHSA: "NO",
            haveRegularToolboxTalks: "NO",
            haveAppointOHSRep: "NO",
            haveFullyEquippedFirstAidBoxes: "NO",
            
            MetaDataNames: new Array("OccupationalHealthAndSafetyCertified", "ProvideCopyOfCompayRiskAssessmentRecords", "HaveAnEvacuationPlan",
                "CompanyDisplayCopyofOHSA", "HaveRegularToolboxTalks", "HaveAppointOHSRep", "HaveFullyEquippedFirstAidBoxes"),

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
                    this.setState({ occupationalHealthAndSafetyCertified: data.find(metaData => metaData.metaDataName === "OccupationalHealthAndSafetyCertified").metaDataValue });
                    this.setState({ provideCopyOfCompayRiskAssessmentRecords: data.find(metaData => metaData.metaDataName === "ProvideCopyOfCompayRiskAssessmentRecords").metaDataValue });
                    this.setState({ haveAnEvacuationPlan: data.find(metaData => metaData.metaDataName === "HaveAnEvacuationPlan").metaDataValue });
                    this.setState({ companyDisplayCopyofOHSA: data.find(metaData => metaData.metaDataName === "CompanyDisplayCopyofOHSA").metaDataValue });
                    this.setState({ haveRegularToolboxTalks: data.find(metaData => metaData.metaDataName === "HaveRegularToolboxTalks").metaDataValue });
                    this.setState({ haveAppointOHSRep: data.find(metaData => metaData.metaDataName === "HaveAppointOHSRep").metaDataValue });
                    this.setState({ haveFullyEquippedFirstAidBoxes: data.find(metaData => metaData.metaDataName === "HaveFullyEquippedFirstAidBoxes").metaDataValue });
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


    ISO18001InfoPOST: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Organization/MetaData/ISO18001Info',
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
    
    occupationalHealthAndSafetyCertified: function (e) {
        this.setState({ occupationalHealthAndSafetyCertified: e.target.value });
        console.log(this.state.occupationalHealthAndSafetyCertified);
    },

    provideCopyOfCompayRiskAssessmentRecords: function (e) {
        this.setState({ provideCopyOfCompayRiskAssessmentRecords: e.target.value });
        console.log(this.state.provideCopyOfCompayRiskAssessmentRecords);
    },

    haveAnEvacuationPlan: function (e) {
        this.setState({ haveAnEvacuationPlan: e.target.value });
        console.log(this.state.haveAnEvacuationPlan);
    },

    companyDisplayCopyofOHSA: function (e) {
        this.setState({ companyDisplayCopyofOHSA: e.target.value });
        console.log(this.state.companyDisplayCopyofOHSA);
    },

    haveRegularToolboxTalks: function (e) {
        this.setState({ haveRegularToolboxTalks: e.target.value });
        console.log(this.state.haveRegularToolboxTalks);
    },

    haveAppointOHSRep: function (e) {
        this.setState({ haveAppointOHSRep: e.target.value });
        console.log(this.state.haveAppointOHSRep);
    },

    haveFullyEquippedFirstAidBoxes: function (e) {
        this.setState({ haveFullyEquippedFirstAidBoxes: e.target.value });
        console.log(this.state.guaranteeOnProducts);
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
                                ISO 18001 Occupation Health and Safety
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
                                                    <td>Is your company ISO 18001 (Occupational Health and Safety) Certified? Upload your ISO 18001 Certificate</td>
                                                    <td><select value={this.state.occupationalHealthAndSafetyCertified} className="form-control" onChange={this.occupationalHealthAndSafetyCertified}><option>NO</option><option>YES</option></select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Can you provide an example of your company's risk assessment records? Upload an example of your risk assessment records</td>
                                                    <td>
                                                        <select value={this.state.provideCopyOfCompayRiskAssessmentRecords} className="form-control" onChange={this.provideCopyOfCompayRiskAssessmentRecords}>>
                                                            <option>NO</option>
                                                            <option>YES</option>
                                                            <option>N/A</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Does your company have an evacuation plan? Upload your Evacuation Plan</td>
                                                    <td>
                                                        <select value={this.state.haveAnEvacuationPlan} className="form-control" onChange={this.haveAnEvacuationPlan}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Does your company display a copy of the Occupational Health and Safety Act within your workplace? Upload a photograph  of the displayed Act</td>
                                                    <td>
                                                        <select value={this.state.companyDisplayCopyofOHSA} className="form-control" onChange={this.companyDisplayCopyofOHSA}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>Does your company have regular toolbox talks or safety meetings? Upload toolbox / safety topic attendance register</td>
                                                    <td>
                                                        <select value={this.state.haveRegularToolboxTalks} className="form-control" onChange={this.haveRegularToolboxTalks}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>Does your company have appointed Health & Safety Representatives? Upload a list of your company's appointed Health & Safety Representatives</td>
                                                    <td>
                                                        <select value={this.state.haveAppointOHSRep} className="form-control" onChange={this.haveAppointOHSRep}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>Does your company have fully equipped first aid boxes on the premises? Upload a photograph of the first aid boxes</td>
                                                    <td>
                                                        <select value={this.state.haveFullyEquippedFirstAidBoxes} className="form-control" onChange={this.haveFullyEquippedFirstAidBoxes}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2" style={lastTR}>I confirm that the above information and documents are correct and valid
                                                        <input style={checkBox} type="checkbox"></input>
                                                    </td>
                                                    <td>
                                                        <button type="button" className="btn btn-primary" onClick={this.ISO18001InfoPOST}>Save</button>
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