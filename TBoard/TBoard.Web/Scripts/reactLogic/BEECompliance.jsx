var BEECompliance = React.createClass({

    getInitialState: function () {
        return {
            DocumentRequirements: [],
            OrganizationID: "",
            UserID: ""
        };
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




    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ OrganizationID: decodedToken.OrganizationID });
        this.setState({ UserID: decodedToken.UserID });
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

        var hidewStyle = {
            display: "none"
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

        $("#AffidavatButton").on("click", function () {
            var x = document.getElementById("BEECertificate");
            var y = document.getElementById("BEEAffidavit");

            x.style.display = "none";
            y.style.display = "block";
        });

        $("#CertificateButton").on("click", function () {
            var x = document.getElementById("BEECertificate");
            var y = document.getElementById("BEEAffidavit");

            y.style.display = "none";
            x.style.display = "block";
        });

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
                                BEE Compliance
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <h4>Please select BEE Compliance </h4>
                        <div className="col-lg-10">
                           <p>
                               <button id="AffidavatButton" type="button" className="btn btn-outline btn-primary btn-lg">Affidavit</button> &nbsp;&nbsp;
                               <button id="CertificateButton" type="button" className="btn btn-outline btn-primary btn-lg">BEE Certificate</button>
                           </p>
                        </div>
                    </div>
                    <br />
                    <div id="BEECertificate" style={hidewStyle}>
                        <BEEComplianceBEECertificate />
                    </div>
                    <div id="BEEAffidavit" style={hidewStyle}>
                        <BEEComplianceAffidavit />
                    </div>
                    
                    <DocumentRequirementsList OrgID={this.props.OrganizationID} DocumentRequirements={this.state.DocumentRequirements} />
                </div>
            </div>
        );
}
});


var BEEComplianceBEECertificate = React.createClass({

    getInitialState: function () {
        return {
            DocumentRequirements: [],
            OrganizationID: "",
            UserID: "",
            BusinessSector: "NO",
            EnterpriseType: "NO",
            BusinessDescription: "NO",
            BEEStatusLevel: "NO",
            BEEProcRecognitionLevelPercentage: "NO",
            FinancialYearRated: "NO",
            BlackOwnershipPercentage: "NO",
            BlackFemalOwnershipPercentage: "NO",
            BlackYouthOwnershipPercentage: "",
            VerificationAgencyName: "NO",
            FinancialYearEnd: "NO",
            FinancialYearTurnOver: "NO",
            AccountantName: "NO",
            DesignatedGroupSupplier: "NO",
            EmpoweringSupplier: "NO",


            MetaDataNames: new Array("BusinessSector",
                "BusinessDescription",
                "BEEStatusLevel",
                "BEEProcRecognitionLevelPercentage",
                "FinancialYearRated",
                "BlackOwnershipPercentage",
                "BlackFemalOwnershipPercentage",
                "BlackYouthOwnershipPercentage",
                "VerificationAgencyName",
                "FinancialYearEnd",
                "FinancialYearTurnOver",
                "AccountantName",
                "DesignatedGroupSupplier",
                "EnterpriseType",
                "EmpoweringSupplier"),

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
                    console.log(data);
                    this.setState({ BusinessSector: data.find(metaData => metaData.metaDataName === "BusinessSector").metaDataValue });
                    this.setState({ BusinessDescription: data.find(metaData => metaData.metaDataName === "BusinessDescription").metaDataValue });
                    this.setState({ BEEStatusLevel: data.find(metaData => metaData.metaDataName === "BEEStatusLevel").metaDataValue });
                    this.setState({ BEEProcRecognitionLevelPercentage: data.find(metaData => metaData.metaDataName === "BEEProcRecognitionLevelPercentage").metaDataValue });
                    this.setState({ FinancialYearRated: data.find(metaData => metaData.metaDataName === "FinancialYearRated").metaDataValue });
                    this.setState({ BlackOwnershipPercentage: data.find(metaData => metaData.metaDataName === "BlackOwnershipPercentage").metaDataValue });
                    this.setState({ BlackFemalOwnershipPercentage: data.find(metaData => metaData.metaDataName === "BlackFemalOwnershipPercentage").metaDataValue });
                    this.setState({ BlackYouthOwnershipPercentage: data.find(metaData => metaData.metaDataName === "BlackYouthOwnershipPercentage").metaDataValue });
                    this.setState({ VerificationAgencyName: data.find(metaData => metaData.metaDataName === "VerificationAgencyName").metaDataValue });
                    this.setState({ FinancialYearEnd: data.find(metaData => metaData.metaDataName === "FinancialYearEnd").metaDataValue });
                    this.setState({ FinancialYearTurnOver: data.find(metaData => metaData.metaDataName === "FinancialYearTurnOver").metaDataValue });
                    this.setState({ AccountantName: data.find(metaData => metaData.metaDataName === "AccountantName").metaDataValue });                   
                    this.setState({ DesignatedGroupSupplier: data.find(metaData => metaData.metaDataName === "DesignatedGroupSupplier").metaDataValue });
                    this.setState({ EmpoweringSupplier: data.find(metaData => metaData.metaDataName === "EmpoweringSupplier").metaDataValue });
                    this.setState({ EnterpriseType: data.find(metaData => metaData.metaDataName === "EnterpriseType").metaDataValue });
                }

            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Organization/MetaData', status, err.toString());
            }.bind(this)
        });
    },



    BEEComplaincePOST: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Organization/MetaData/BEEComplaince',
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


    BusinessSector: function (e) {
        this.setState({ BusinessSector: e.target.value });
        console.log(this.state.BusinessSector);
    },

    BusinessDescription: function (e) {
        this.setState({ BusinessDescription: e.target.value });
        console.log(this.state.BusinessDescription);
    },

    BEEStatusLevel: function (e) {
        this.setState({ BEEStatusLevel: e.target.value });
        console.log(this.state.BEEStatusLevel);
    },

    BEEProcRecognitionLevelPercentage: function (e) {
        this.setState({ BEEProcRecognitionLevelPercentage: e.target.value });
        console.log(this.state.BEEProcRecognitionLevelPercentage);
    },

    FinancialYearRated: function (e) {
        this.setState({ FinancialYearRated: e.target.value });
        console.log(this.state.FinancialYearRated);
    },

    BlackOwnershipPercentage: function (e) {
        this.setState({ BlackOwnershipPercentage: e.target.value });
        console.log(this.state.BlackOwnershipPercentage);
    },

    BlackFemalOwnershipPercentage: function (e) {
        this.setState({ BlackFemalOwnershipPercentage: e.target.value });
        console.log(this.state.BlackFemalOwnershipPercentage);
    },

    BlackYouthOwnershipPercentage: function (e) {
        this.setState({ BlackYouthOwnershipPercentage: e.target.value });
        console.log(this.state.BlackYouthOwnershipPercentage);
    },

    VerificationAgencyName: function (e) {
        this.setState({ VerificationAgencyName: e.target.value });
        console.log(this.state.VerificationAgencyName);
    },

    FinancialYearEnd: function (e) {
        this.setState({ FinancialYearEnd: e.target.value });
        console.log(this.state.FinancialYearEnd);
    },

    FinancialYearTurnOver: function (e) {
        this.setState({ FinancialYearTurnOver: e.target.value });
        console.log(this.state.FinancialYearTurnOver);
    },

    AccountantName: function (e) {
        this.setState({ AccountantName: e.target.value });
        console.log(this.state.AccountantName);
    },

    DesignatedGroupSupplier: function (e) {
        this.setState({ DesignatedGroupSupplier: e.target.value });
        console.log(this.state.DesignatedGroupSupplier);
    },

    EmpoweringSupplier: function (e) {
        this.setState({ EmpoweringSupplier: e.target.value });
        console.log(this.state.EmpoweringSupplier);
    },

    EnterpriseType: function (e) {
        this.setState({ EnterpriseType: e.target.value });
        console.log(this.state.EnterpriseType);
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

        }
    },

    componentDidMount: function () {

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
                <div>
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
                                                    <td>Business Sector</td>
                                                    <td><select value={this.state.BusinessSector} className="form-control" onChange={this.BusinessSector}>
                                                            <option value="Please Select">Please Select</option>
                                                            <option value="Construction - Building Environment Professionals">Construction - Building Environment Professionals</option>
                                                            <option value="Transport">Transport</option>
                                                            <option value="All Other (Example: Mining)">All Other (Example: Mining)</option>
    <option value="Tourism">Tourism</option>
    <option value="Property">Property</option>
    <option value="Marketing, Advertising and Communications">Marketing, Advertising and Communications</option>
    <option value="Information and Communication Technologies ">Information and Communication Technologies </option>
    <option value="Forestry">Forestry</option>
    <option value="Financial">Financial</option>
    <option value="Construction - Contractors">Construction - Contractors</option>
    <option value="Agri-BEE">Agri-BEE</option>
</select>
</td>
</tr>
<tr>
<td>2</td>
<td>Enterprise Type</td>
<td>
    <select value={this.state.EnterpriseType} className="form-control" onChange={this.EnterpriseType}>
         <option value="Please Select">Please Select</option>
         <option value="EME (Exempted Micro Enterprises)">EME (Exempted Micro Enterprises) </option>
         <option value="QSE > 51% Black Ownership">QSE GT 51% Black Ownership  </option>
         <option value="QSE < 51% Black Ownership">QSE LT 51% Black Ownership </option>
         <option value="Generic ">Generic </option>

    </select>
</td>
</tr>
<tr>
<td>3</td>
<td>Description of your Business</td>
<td>
    <textarea value={this.state.BusinessDescription} onChange={this.BusinessDescription}   className="form-control" rows="3" ></textarea>
</td>
</tr>
<tr>
<td>4</td>
<td>BEE Status Level</td>
<td>
    <select value={this.state.BEEStatusLevel} className="form-control" onChange={this.BEEStatusLevel}>
        <option value="Please Select">Please Select</option>
        <option value="Level One Contributor">Level One Contributor</option>
        <option value="Level Two Contributor">Level Two Contributor</option>
        <option value="Level Three Contributor">Level Three Contributor</option>
        <option value="Level Four Contributor">Level Four Contributor</option>
        <option value="Level Five Contributor">Level Five Contributor</option>
        <option value="Level Six Contributor">Level Six Contributor</option>
        <option value="Level Seven Contributor">Level Seven Contributor</option>
        <option value="Level Eight Contributor">Level Eight Contributor</option>
        <option value="Non-Compliant Contributor">Non-Compliant Contributor</option>
    </select>
</td>
</tr>
<tr>
<td>5</td>
<td>BEE Procurement Recognition Level Percentage?</td>
<td>
    <select value={this.state.BEEProcRecognitionLevelPercentage} className="form-control" onChange={this.BEEProcRecognitionLevelPercentage}>
        <option value="Please Select">Please Select</option>
        <option value="135% BEE Recognition Level">135% BEE Recognition Level</option>
        <option value="125% BEE Recognition Level">125% BEE Recognition Level</option>
        <option value="110% BEE Recognition Level">110% BEE Recognition Level</option>
        <option value="100% BEE Recognition Level">100% BEE Recognition Level</option>
        <option value="80% BEE Recognition Level">80% BEE Recognition Level</option>
        <option value="60% BEE Recognition Level">60% BEE Recognition Level</option>
        <option value="50% BEE Recognition Level">50% BEE Recognition Level</option>
        <option value="0% BEE Recognition Level">0% BEE Recognition Level</option>
    </select>
</td>
</tr>
<tr>
<td>6</td>
<td>Financial Year Rated</td>
<td>
   <input className="form-control"  value={this.state.FinancialYearEnd} onChange={this.FinancialYearEnd} ></input>
</td>
</tr>
<tr>
<td>7</td>
<td>Black Ownership Percentage</td>
<td>
     <select value={this.state.BlackOwnershipPercentage} className="form-control" onChange={this.BlackOwnershipPercentage}>
        <option value="0%">0%</option>
        <option value="10%">10%</option>
        <option value="20%">20%</option>
        <option value="30%">30%</option>
        <option value="40%">40%</option>
        <option value="50%">50%</option>
        <option value="60%">60%</option>
        <option value="70%">70%</option>
        <option value="80%">80%</option>
        <option value="90%">90%</option>
        <option value="100%">100%</option>
    </select>
</td>
</tr>
<tr>
<td>8</td>
<td>Black Female Ownership Percentage</td>
<td>
    <select value={this.state.BlackFemalOwnershipPercentage} className="form-control" onChange={this.BlackFemalOwnershipPercentage}>
        <option value="0%">0%</option>
        <option value="10%">10%</option>
        <option value="20%">20%</option>
        <option value="30%">30%</option>
        <option value="40%">40%</option>
        <option value="50%">50%</option>
        <option value="60%">60%</option>
        <option value="70%">70%</option>
        <option value="80%">80%</option>
        <option value="90%">90%</option>
        <option value="100%">100%</option>
    </select>
</td>
</tr>
<tr>
<td>9</td>
<td>VBlack Youth Ownership Percentage (Aged 18 - 35)</td>
        <td> <select value={this.state.BlackYouthOwnershipPercentage} className="form-control" onChange={this.BlackYouthOwnershipPercentage}>
                <option value="0%">0%</option>
                <option value="10%">10%</option>
                <option value="20%">20%</option>
                <option value="30%">30%</option>
                <option value="40%">40%</option>
                <option value="50%">50%</option>
                <option value="60%">60%</option>
                <option value="70%">70%</option>
                <option value="80%">80%</option>
                <option value="90%">90%</option>
                <option value="100%">100%</option>
            </select>
        </td>
    </tr>
    <tr>
        <td>10</td>
        <td>Verification Agency Name</td>
        <td>
          <input className="form-control" value={this.state.VerificationAgencyName} onChange={this.VerificationAgencyName} ></input>
        </td>
    </tr>
    <tr>
        <td>11</td>
        <td>Financial Year End</td>
        <td>
            <select value={this.state.FinancialYearEnd} className="form-control" onChange={this.FinancialYearEnd}>
                <option value="JAN">JAN</option>
                <option value="FEB">FEB</option>
                <option value="MARCH">MARCH</option>
                <option value="APRIL">APRIL</option>
                <option value="MAY">MAY</option>
                <option value="JUNE">JUNE</option>
                <option value="JULY">JULY</option>
                <option value="AUG">AUG</option>
                <option value="SEP">SEP</option>
                <option value="OCT">OCT</option>
                <option value="NOV">NOV</option>
                <option value="DEC">DEC</option>
            </select>
        </td>
    </tr>
    <tr>
        <td>12</td>
        <td>Upload your company's BEE Scorecard Report</td>
        <td>

        </td>
    </tr>
    <tr>
        <td>13</td>
        <td>What was your turnover for last financial year?</td>
        <td>
            <input className="form-control" value={this.state.FinancialYearTurnOver} onChange={this.FinancialYearTurnOver} ></input>
        </td>
    </tr>
    <tr>
        <td>14</td>
        <td>Do you have a letter from accountant confirming turnover?</td>
        <td>

        </td>
    </tr>
    <tr>
        <td>15</td>
        <td>Name of accountant / auditor</td>
        <td>
           <input className="form-control"  value={this.state.AccountantName} onChange={this.AccountantName} ></input>
        </td>
    </tr>
    <tr>
        <td>16</td>
        <td>Designated Group Supplier</td>
        <td>
            <select value={this.state.DesignatedGroupSupplier} className="form-control" onChange={this.DesignatedGroupSupplier}>
               <option>NO</option><option>YES</option>
            </select>
        </td>
    </tr>
    <tr>
        <td>17</td>
        <td>Empowering Supplier</td>
        <td>
            <select value={this.state.EmpoweringSupplier} className="form-control" onChange={this.EmpoweringSupplier}>
               <option>NO</option><option>YES</option>
            </select>
        </td>
    </tr>
    <tr>
    <td colSpan="2" style={lastTR}>I confirm that the above information and documents are correct and valid
        <input style={checkBox} type="checkbox"></input>
    </td>
    <td>
        <button type="button" className="btn btn-primary" onClick={this.BEEComplaincePOST}>Save</button>
    </td>
    </tr>
</tbody>
</table>
</div>

</div>
</div>
</div>
</div>
</div>
</div>
);
    }
});


var BEEComplianceAffidavit = React.createClass({

    getInitialState: function () {
        return {
            DocumentRequirements: [],
            OrganizationID: "",
            UserID: "",
            BusinessSector: "NO",
            EnterpriseType: "NO",
            BusinessDescription: "NO",
            BEEStatusLevel: "NO",
            BEEProcRecognitionLevelPercentage: "NO",
            FinancialYearRated: "NO",
            BlackOwnershipPercentage: "NO",
            BlackFemalOwnershipPercentage: "NO",
            BlackYouthOwnershipPercentage: "",
            VerificationAgencyName: "NO",
            FinancialYearEnd: "NO",
            FinancialYearTurnOver: "NO",
            AccountantName: "NO",
            ShareHolderCount: "0",
            ShareHolderBlack: "0",
            ShareHolder18to35: "0",
            ShareHolderBlackAndDisabled: "0",
            ShareHolderUnemployed: "0",
            ShareHolderRuralArea: "0",
            ShareHolderBlackMilitaryVeterans: "0",
            DateAffidavitSigned: "",
            ShareHolderBlackFemales: "",


            MetaDataNames: new Array("BusinessSector",
"BusinessDescription",
"BEEStatusLevel",
"BEEProcRecognitionLevelPercentage",
"FinancialYearRated",
"BlackOwnershipPercentage",
"BlackFemalOwnershipPercentage",
"BlackYouthOwnershipPercentage",
"VerificationAgencyName",
"FinancialYearEnd",
"FinancialYearTurnOver",
"AccountantName",
"DesignatedGroupSupplier",
"EnterpriseType",
"ShareHolderCount",
"ShareHolderBlack",
"ShareHolder18to35",
"ShareHolderBlackAndDisabled",
"ShareHolderUnemployed",
"ShareHolderRuralArea",
"ShareHolderBlackMilitaryVeterans",
"DateAffidavitSigned",
                "ShareHolderBlackFemales"
                ),

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
                    console.log(data);
                    this.setState({ BusinessSector: data.find(metaData => metaData.metaDataName === "BusinessSector").metaDataValue });
                    this.setState({ BusinessDescription: data.find(metaData => metaData.metaDataName === "BusinessDescription").metaDataValue });
                    this.setState({ BEEStatusLevel: data.find(metaData => metaData.metaDataName === "BEEStatusLevel").metaDataValue });
                    this.setState({ BEEProcRecognitionLevelPercentage: data.find(metaData => metaData.metaDataName === "BEEProcRecognitionLevelPercentage").metaDataValue });
                    this.setState({ FinancialYearRated: data.find(metaData => metaData.metaDataName === "FinancialYearRated").metaDataValue });
                    this.setState({ BlackOwnershipPercentage: data.find(metaData => metaData.metaDataName === "BlackOwnershipPercentage").metaDataValue });
                    this.setState({ BlackFemalOwnershipPercentage: data.find(metaData => metaData.metaDataName === "BlackFemalOwnershipPercentage").metaDataValue });
                    this.setState({ BlackYouthOwnershipPercentage: data.find(metaData => metaData.metaDataName === "BlackYouthOwnershipPercentage").metaDataValue });
                    this.setState({ VerificationAgencyName: data.find(metaData => metaData.metaDataName === "VerificationAgencyName").metaDataValue });
                    this.setState({ FinancialYearEnd: data.find(metaData => metaData.metaDataName === "FinancialYearEnd").metaDataValue });
                    this.setState({ FinancialYearTurnOver: data.find(metaData => metaData.metaDataName === "FinancialYearTurnOver").metaDataValue });
                    this.setState({ AccountantName: data.find(metaData => metaData.metaDataName === "AccountantName").metaDataValue });                   
                    this.setState({ DesignatedGroupSupplier: data.find(metaData => metaData.metaDataName === "DesignatedGroupSupplier").metaDataValue });
                    this.setState({ EmpoweringSupplier: data.find(metaData => metaData.metaDataName === "EmpoweringSupplier").metaDataValue });
                    this.setState({ EnterpriseType: data.find(metaData => metaData.metaDataName === "EnterpriseType").metaDataValue });                   
                    this.setState({ ShareHolderCount: data.find(metaData => metaData.metaDataName === "ShareHolderCount").metaDataValue });
                    this.setState({ ShareHolderBlackFemales: data.find(metaData => metaData.metaDataName === "ShareHolderBlackFemales").metaDataValue });
                    this.setState({ ShareHolderBlack: data.find(metaData => metaData.metaDataName === "ShareHolderBlack").metaDataValue });
                    this.setState({ ShareHolder18to35: data.find(metaData => metaData.metaDataName === "ShareHolder18to35").metaDataValue });
                    this.setState({ ShareHolderBlackAndDisabled: data.find(metaData => metaData.metaDataName === "ShareHolderBlackAndDisabled").metaDataValue });
                    this.setState({ ShareHolderUnemployed: data.find(metaData => metaData.metaDataName === "ShareHolderUnemployed").metaDataValue });
                    this.setState({ ShareHolderRuralArea: data.find(metaData => metaData.metaDataName === "ShareHolderRuralArea").metaDataValue });
                    this.setState({ ShareHolderBlackMilitaryVeterans: data.find(metaData => metaData.metaDataName === "ShareHolderBlackMilitaryVeterans").metaDataValue });
                    this.setState({ DateAffidavitSigned: data.find(metaData => metaData.metaDataName === "DateAffidavitSigned").metaDataValue });                    
                }

            }.bind(this),
            error: function (xhr, status, err) {
                console.error('api/Organization/MetaData', status, err.toString());
            }.bind(this)
        });
    },



    BEEComplaincePOST: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Organization/MetaData/BEEComplaince',
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


    BusinessSector: function (e) {
        this.setState({ BusinessSector: e.target.value });
        console.log(this.state.BusinessSector);
    },

    BusinessDescription: function (e) {
        this.setState({ BusinessDescription: e.target.value });
        console.log(this.state.BusinessDescription);
    },

    BEEStatusLevel: function (e) {
        this.setState({ BEEStatusLevel: e.target.value });
        console.log(this.state.BEEStatusLevel);
    },

    BEEProcRecognitionLevelPercentage: function (e) {
        this.setState({ BEEProcRecognitionLevelPercentage: e.target.value });
        console.log(this.state.BEEProcRecognitionLevelPercentage);
    },

    FinancialYearRated: function (e) {
        this.setState({ FinancialYearRated: e.target.value });
        console.log(this.state.FinancialYearRated);
    },

    BlackOwnershipPercentage: function (e) {
        this.setState({ BlackOwnershipPercentage: e.target.value });
        console.log(this.state.BlackOwnershipPercentage);
    },

    BlackFemalOwnershipPercentage: function (e) {
        this.setState({ BlackFemalOwnershipPercentage: e.target.value });
        console.log(this.state.BlackFemalOwnershipPercentage);
    },

    BlackYouthOwnershipPercentage: function (e) {
        this.setState({ BlackYouthOwnershipPercentage: e.target.value });
        console.log(this.state.BlackYouthOwnershipPercentage);
    },

    VerificationAgencyName: function (e) {
        this.setState({ VerificationAgencyName: e.target.value });
        console.log(this.state.VerificationAgencyName);
    },

    FinancialYearEnd: function (e) {
        this.setState({ FinancialYearEnd: e.target.value });
        console.log(this.state.FinancialYearEnd);
    },

    FinancialYearTurnOver: function (e) {
        this.setState({ FinancialYearTurnOver: e.target.value });
        console.log(this.state.FinancialYearTurnOver);
    },

    AccountantName: function (e) {
        this.setState({ AccountantName: e.target.value });
        console.log(this.state.AccountantName);
    },

    DesignatedGroupSupplier: function (e) {
        this.setState({ DesignatedGroupSupplier: e.target.value });
        console.log(this.state.DesignatedGroupSupplier);
    },

    EmpoweringSupplier: function (e) {
        this.setState({ EmpoweringSupplier: e.target.value });
        console.log(this.state.EmpoweringSupplier);
    },

    EnterpriseType: function (e) {
        this.setState({ EnterpriseType: e.target.value });
        console.log(this.state.EnterpriseType);
    },

    ShareHolderCount: function (e) {
        this.setState({ ShareHolderCount: e.target.value });
        console.log(this.state.ShareHolderCount);
    },

    ShareHolderBlack: function (e) {
        this.setState({ ShareHolderBlack: e.target.value });
        console.log(this.state.ShareHolderBlack);
    },    

    ShareHolderBlackFemales: function (e) {
        this.setState({ ShareHolderBlackFemales: e.target.value });
        console.log(this.state.ShareHolderBlackFemales);
    },

    ShareHolder18to35: function (e) {
        this.setState({ ShareHolder18to35: e.target.value });
        console.log(this.state.ShareHolder18to35);
    },

    ShareHolderBlackAndDisabled: function (e) {
        this.setState({ ShareHolderBlackAndDisabled: e.target.value });
        console.log(this.state.ShareHolderBlackAndDisabled);
    },

    ShareHolderUnemployed: function (e) {
        this.setState({ ShareHolderUnemployed: e.target.value });
        console.log(this.state.ShareHolderUnemployed);
    },

    ShareHolderRuralArea: function (e) {
        this.setState({ ShareHolderRuralArea: e.target.value });
        console.log(this.state.ShareHolderRuralArea);
    },

    ShareHolderBlackMilitaryVeterans: function (e) {
        this.setState({ ShareHolderBlackMilitaryVeterans: e.target.value });
        console.log(this.state.ShareHolderBlackMilitaryVeterans);
    },

    DateAffidavitSigned: function (e) {
        this.setState({ DateAffidavitSigned: e.target.value });
        console.log(this.state.DateAffidavitSigned);
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

        }
    },

    componentDidMount: function () {

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
                <div>
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
                                                    <td>Business Sector</td>
                                                    <td><select value={this.state.BusinessSector} className="form-control" onChange={this.BusinessSector}>
                                                            <option value="Please Select">Please Select</option>
                                                            <option value="Construction - Building Environment Professionals">Construction - Building Environment Professionals</option>
                                                            <option value="Transport">Transport</option>
                                                            <option value="All Other (Example: Mining)">All Other (Example: Mining)</option>
    <option value="Tourism">Tourism</option>
    <option value="Property">Property</option>
    <option value="Marketing, Advertising and Communications">Marketing, Advertising and Communications</option>
    <option value="Information and Communication Technologies ">Information and Communication Technologies </option>
    <option value="Forestry">Forestry</option>
    <option value="Financial">Financial</option>
    <option value="Construction - Contractors">Construction - Contractors</option>
    <option value="Agri-BEE">Agri-BEE</option>
</select>
</td>
</tr>
<tr>
<td>2</td>
<td>Enterprise Type</td>
<td>
    <select value={this.state.EnterpriseType} className="form-control" onChange={this.EnterpriseType}>
         <option value="Please Select">Please Select</option>
         <option value="EME (Exempted Micro Enterprises) ">EME (Exempted Micro Enterprises) </option>
         <option value="QSE >51% Black Ownership ">QSE GT 51% Black Ownership  </option>
         <option value="QSE < 51% Black Ownership ">QSE LT 51% Black Ownership </option>
         <option value="Generic ">Generic </option>

    </select>
</td>
</tr>
<tr>
<td>3</td>
<td>Description of your Business</td>
<td>
    <textarea className="form-control" rows="3" value={this.state.BusinessDescription}  onChange={this.BusinessDescription}></textarea>
</td>
</tr>
<tr>
<td>4</td>
<td>BEE Status Level</td>
<td>
    <select value={this.state.BEEStatusLevel} className="form-control" onChange={this.BEEStatusLevel}>
        <option value="Please Select">Please Select</option>
        <option value="Level One Contributor">Level One Contributor</option>
        <option value="Level Two Contributor">Level Two Contributor</option>
        <option value="Level Three Contributor">Level Three Contributor</option>
        <option value="Level Four Contributor">Level Four Contributor</option>
        <option value="Level Five Contributor">Level Five Contributor</option>
        <option value="Level Six Contributor">Level Six Contributor</option>
        <option value="Level Seven Contributor">Level Seven Contributor</option>
        <option value="Level Eight Contributor">Level Eight Contributor</option>
        <option value="Non-Compliant Contributor">Non-Compliant Contributor</option>
    </select>
</td>
</tr>
<tr>
<td>5</td>
<td>BEE Procurement Recognition Level Percentage?</td>
<td>
    <select value={this.state.BEEProcRecognitionLevelPercentage} className="form-control" onChange={this.BEEProcRecognitionLevelPercentage}>
        <option value="Please Select">Please Select</option>
        <option value="135% BEE Recognition Level">135% BEE Recognition Level</option>
        <option value="125% BEE Recognition Level">125% BEE Recognition Level</option>
        <option value="110% BEE Recognition Level">110% BEE Recognition Level</option>
        <option value="100% BEE Recognition Level">100% BEE Recognition Level</option>
        <option value="80% BEE Recognition Level">80% BEE Recognition Level</option>
        <option value="60% BEE Recognition Level">60% BEE Recognition Level</option>
        <option value="50% BEE Recognition Level">50% BEE Recognition Level</option>
        <option value="0% BEE Recognition Level">0% BEE Recognition Level</option>
    </select>
</td>
</tr>
<tr>
<td>6</td>
<td>Financial Year Rated</td>
<td>
   <input  value={this.state.FinancialYearRated} onChange={this.FinancialYearRated} className="form-control"></input>
</td>
</tr>
<tr>
<td>7</td>
<td>Black Ownership Percentage</td>
<td>
     <select value={this.state.BlackOwnershipPercentage} className="form-control" onChange={this.BlackOwnershipPercentage}>
        <option value="0%">0%</option>
        <option value="10%">10%</option>
        <option value="20%">20%</option>
        <option value="30%">30%</option>
        <option value="40%">40%</option>
        <option value="50%">50%</option>
        <option value="60%">60%</option>
        <option value="70%">70%</option>
        <option value="80%">80%</option>
        <option value="90%">90%</option>
        <option value="100%">100%</option>
    </select>
</td>
</tr>
<tr>
<td>8</td>
<td>Black Female Ownership Percentage</td>
<td>
    <select value={this.state.BlackFemalOwnershipPercentage} className="form-control" onChange={this.BlackFemalOwnershipPercentage}>
        <option value="0%">0%</option>
        <option value="10%">10%</option>
        <option value="20%">20%</option>
        <option value="30%">30%</option>
        <option value="40%">40%</option>
        <option value="50%">50%</option>
        <option value="60%">60%</option>
        <option value="70%">70%</option>
        <option value="80%">80%</option>
        <option value="90%">90%</option>
        <option value="100%">100%</option>
    </select>
</td>
</tr>
<tr>
<td>9</td>
<td>Black Youth Ownership Percentage (Aged 18 - 35)</td>
        <td> <select value={this.state.BlackYouthOwnershipPercentage} className="form-control" onChange={this.BlackYouthOwnershipPercentage}>
                <option value="0%">0%</option>
                <option value="10%">10%</option>
                <option value="20%">20%</option>
                <option value="30%">30%</option>
                <option value="40%">40%</option>
                <option value="50%">50%</option>
                <option value="60%">60%</option>
                <option value="70%">70%</option>
                <option value="80%">80%</option>
                <option value="90%">90%</option>
                <option value="100%">100%</option>
            </select>
        </td>
    </tr>
    <tr>
        <td>10</td>
        <td>Verification Agency Name</td>
        <td>
          <input className="form-control" value={this.state.VerificationAgencyName} onChange={this.VerificationAgencyName} ></input>
        </td>
    </tr>
    <tr>
        <td>11</td>
        <td>Financial Year End</td>
        <td>
            <select value={this.state.FinancialYearEnd} className="form-control" onChange={this.FinancialYearEnd}>
                <option value="JAN">JAN</option>
                <option value="FEB">FEB</option>
                <option value="MARCH">MARCH</option>
                <option value="APRIL">APRIL</option>
                <option value="MAY">MAY</option>
                <option value="JUNE">JUNE</option>
                <option value="JULY">JULY</option>
                <option value="AUG">AUG</option>
                <option value="SEP">SEP</option>
                <option value="OCT">OCT</option>
                <option value="NOV">NOV</option>
                <option value="DEC">DEC</option>
            </select>
        </td>
    </tr>
    <tr>
        <td>12</td>
        <td>Upload your company's BEE Scorecard Report</td>
        <td>

        </td>
    </tr>
    <tr>
        <td>13</td>
        <td>What was your turnover for last financial year?</td>
        <td>
            <input className="form-control"  value={this.state.FinancialYearTurnOver} onChange={this.FinancialYearTurnOver} ></input>
        </td>
    </tr>
    <tr>
        <td>14</td>
        <td>Do you have a letter from accountant confirming turnover?</td>
        <td>

        </td>
    </tr>
    <tr>
        <td>15</td>
        <td>Name of accountant / auditor</td>
        <td>
           <input className="form-control"  value={this.state.AccountantName} onChange={this.AccountantName} ></input>
        </td>
    </tr>
    <tr>
        <td>16</td>
        <td>Designated Group Supplier</td>
        <td>
            <select value={this.state.DesignatedGroupSupplier} className="form-control" onChange={this.DesignatedGroupSupplier}>
               <option>NO</option><option>YES</option>
            </select>
        </td>
    </tr>
    <tr>
        <td>17</td>
        <td>Empowering Supplier</td>
        <td>
            <select value={this.state.EmpoweringSupplier} className="form-control" onChange={this.EmpoweringSupplier}>
               <option>NO</option><option>YES</option>
            </select>
        </td>
    </tr>
    <tr>
        <td>18</td>
        <td>How many shareholders does your company have</td>
        <td>
           <input  value={this.state.ShareHolderCount} onChange={this.ShareHolderCount}  className="form-control"></input>
        </td>
    </tr>
    <tr>
        <td>19</td>
        <td>How many of your shareholders are black</td>
        <td>
           <input  value={this.state.ShareHolderBlack} onChange={this.ShareHolderBlack}  className="form-control"></input>
        </td>
    </tr>
    <tr>
        <td>20</td>
        <td>How many of your shareholders are black females</td>
        <td>
           <input  value={this.state.ShareHolderBlackFemales} onChange={this.ShareHolderBlackFemales}  className="form-control"></input>
        </td>
    </tr>
    <tr>
        <td>21</td>
        <td>How many of your shareholders are between the ages of 18 and 35</td>
        <td>
           <input value={this.state.ShareHolder18to35} onChange={this.ShareHolder18to35}  className="form-control"></input>
        </td>
    </tr>
    <tr>
        <td>22</td>
        <td>How many of your shareholders are black and disabled</td>
        <td>
           <input   value={this.state.ShareHolderBlackAndDisabled} onChange={this.ShareHolderBlackAndDisabled} className="form-control"></input>
        </td>
    </tr>
    <tr>
        <td>23</td>
        <td>How many of your shareholders were unemployed at the time of becoming a shareholder?</td>
        <td>
           <input  value={this.state.ShareHolderUnemployed} onChange={this.ShareHolderUnemployed}  className="form-control"></input>
        </td>
    </tr>
    <tr>
        <td>24</td>
        <td>How many shareholders live in a rural area</td>
        <td>
           <input  value={this.state.ShareHolderRuralArea} onChange={this.ShareHolderRuralArea}  className="form-control"></input>
        </td>
    </tr>
    <tr>
        <td>25</td>
        <td>How many shareholders are black military veterans</td>
        <td>
           <input  value={this.state.ShareHolderBlackMilitaryVeterans} onChange={this.ShareHolderBlackMilitaryVeterans}  className="form-control"></input>
        </td>
    </tr>
    <tr>
        <td>26</td>
        <td>Date when the Affidavit was signed by the Deponent</td>
        <td>
           <input  value={this.state.DateAffidavitSigned} onChange={this.DateAffidavitSigned}  className="form-control"></input>
        </td>
    </tr>
    <tr>
    <td colSpan="2" style={lastTR}>I confirm that the above information and documents are correct and valid
        <input style={checkBox} type="checkbox"></input>
    </td>
    <td>
        <button type="button" className="btn btn-primary" onClick={this.BEEComplaincePOST}>Save</button>
    </td>
    </tr>
</tbody>
</table>
</div>

</div>
</div>
</div>
</div>
</div>
</div>
);
    }
});