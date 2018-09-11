﻿var ISO14001QualityManagement = React.createClass({

    getInitialState: function () {
        return {
            DocumentRequirements: [],
            OrganizationID: "",
            UserID: "",
            environmentalManagementSystemCertified: "NO",
            environmentalManagementPolicy: "NO",
            registeredWithSaatcaOrSacnasp: "NO",
            reduceCarbonFootPrint: "NO",
            enviromentalIncidentProcedure: "NO",
            driversLicensedToTransportCargo: "NO",
            supplyHazardousGoods: "NO",
            haveMaterialSafetyDataSheet: "",
            transportWasteToLicensedWasteFacilities: "NO",
            trucksMarkedWithCorrectSignage: "NO",
            provideWasteDisposalProcedure: "NO",
            permitsToTransportWaste: "NO",
            trucksRegularlyServiced: "NO",
            provideSpillCLeanUpProcedure: "NO",
            provideHousekeepingProcedure: "NO",
            usePrincipleOfReUse: "NO",

            MetaDataNames: new Array("EnvironmentalManagementSystemCertified",
                "EnvironmentalManagementPolicy",
                "RegisteredWithSaatcaOrSacnasp",
                "ReduceCarbonFootPrint",
                "EnviromentalIncidentProcedure",
                "DriversLicensedToTransportCargo",
                "SupplyHazardousGoods",
                "HaveMaterialSafetyDataSheet",
                "TransportWasteToLicensedWasteFacilities",
                "TrucksMarkedWithCorrectSignage",
                "ProvideWasteDisposalProcedure",
                "PermitsToTransportWaste",
                "TrucksRegularlyServiced",
                "ProvideSpillCLeanUpProcedure",
                "ProvideHousekeepingProcedure",
                "UsePrincipleOfReUse"),

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
                    this.setState({ environmentalManagementSystemCertified: data.find(metaData => metaData.metaDataName === "EnvironmentalManagementSystemCertified").metaDataValue });
                    this.setState({ usePrincipleOfReUse: data.find(metaData => metaData.metaDataName === "UsePrincipleOfReUse").metaDataValue });
                    this.setState({ environmentalManagementPolicy: data.find(metaData => metaData.metaDataName === "EnvironmentalManagementPolicy").metaDataValue });
                    this.setState({ registeredWithSaatcaOrSacnasp: data.find(metaData => metaData.metaDataName === "RegisteredWithSaatcaOrSacnasp").metaDataValue });
                    this.setState({ reduceCarbonFootPrint: data.find(metaData => metaData.metaDataName === "ReduceCarbonFootPrint").metaDataValue });
                    this.setState({ enviromentalIncidentProcedure: data.find(metaData => metaData.metaDataName === "EnviromentalIncidentProcedure").metaDataValue });
                    this.setState({ driversLicensedToTransportCargo: data.find(metaData => metaData.metaDataName === "DriversLicensedToTransportCargo").metaDataValue });
                    this.setState({ supplyHazardousGoods: data.find(metaData => metaData.metaDataName === "SupplyHazardousGoods").metaDataValue });
                    this.setState({ haveMaterialSafetyDataSheet: data.find(metaData => metaData.metaDataName === "HaveMaterialSafetyDataSheet").metaDataValue });
                    this.setState({ transportWasteToLicensedWasteFacilities: data.find(metaData => metaData.metaDataName === "TransportWasteToLicensedWasteFacilities").metaDataValue });
                    this.setState({ trucksMarkedWithCorrectSignage: data.find(metaData => metaData.metaDataName === "TrucksMarkedWithCorrectSignage").metaDataValue });
                    this.setState({ provideWasteDisposalProcedure: data.find(metaData => metaData.metaDataName === "ProvideWasteDisposalProcedure").metaDataValue });
                    this.setState({ permitsToTransportWaste: data.find(metaData => metaData.metaDataName === "PermitsToTransportWaste").metaDataValue });
                    this.setState({ trucksRegularlyServiced: data.find(metaData => metaData.metaDataName === "TrucksRegularlyServiced").metaDataValue });
                    this.setState({ provideSpillCLeanUpProcedure: data.find(metaData => metaData.metaDataName === "ProvideSpillCLeanUpProcedure").metaDataValue });
                    this.setState({ provideHousekeepingProcedure: data.find(metaData => metaData.metaDataName === "ProvideHousekeepingProcedure").metaDataValue });
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


    ISO14001InfoPOST: function () {
        console.log('POSTING FORM');
        $.ajax({
            url: 'api/Organization/MetaData/ISO14001Info',
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
    

    environmentalManagementSystemCertified: function (e) {
        this.setState({ environmentalManagementSystemCertified: e.target.value });
        console.log(this.state.environmentalManagementSystemCertified);
    },

    environmentalManagementPolicy: function (e) {
        this.setState({ environmentalManagementPolicy: e.target.value });
        console.log(this.state.environmentalManagementPolicy);
    },

    registeredWithSaatcaOrSacnasp: function (e) {
        this.setState({ registeredWithSaatcaOrSacnasp: e.target.value });
        console.log(this.state.registeredWithSaatcaOrSacnasp);
    },

    reduceCarbonFootPrint: function (e) {
        this.setState({ reduceCarbonFootPrint: e.target.value });
        console.log(this.state.reduceCarbonFootPrint);
    },

    enviromentalIncidentProcedure: function (e) {
        this.setState({ managementReviewenviromentalIncidentProcedureMeetingMinutes: e.target.value });
        console.log(this.state.enviromentalIncidentProcedure);
    },

    driversLicensedToTransportCargo: function (e) {
        this.setState({ drivesLicensedToTransportCargo: e.target.value });
        console.log(this.state.drivesLicensedToTransportCargo);
    },

    supplyHazardousGoods: function (e) {
        this.setState({ supplyHazardousGoods: e.target.value });
        console.log(this.state.supplyHazardousGoods);
    },

    transportWasteToLicensedWasteFacilities: function (e) {
        this.setState({ transportWasteToLicensedWasteFacilities: e.target.value });
        console.log(this.state.transportWasteToLicensedWasteFacilities);
    },

    trucksMarkedWithCorrectSignage: function (e) {
        this.setState({ trucksMarkedWithCorrectSignage: e.target.value });
        console.log(this.state.trucksMarkedWithCorrectSignage);
    },

    provideWasteDisposalProcedure: function (e) {
        this.setState({ provideWasteDisposalProcedure: e.target.value });
        console.log(this.state.provideWasteDisposalProcedure);
    },

    permitsToTransportWaste: function (e) {
        this.setState({ permitsToTransportWaste: e.target.value });
        console.log(this.state.permitsToTransportWaste);
    },

    trucksRegularlyServiced: function (e) {
        this.setState({ trucksRegularlyServiced: e.target.value });
        console.log(this.state.trucksRegularlyServiced);
    },

    provideSpillCLeanUpProcedure: function (e) {
        this.setState({ provideSpillCLeanUpProcedure: e.target.value });
        console.log(this.state.provideSpillCLeanUpProcedure);
    },

    provideHousekeepingProcedure: function (e) {
        this.setState({ provideHousekeepingProcedure: e.target.value });
        console.log(this.state.provideHousekeepingProcedure);
    },

    usePrincipleOfReUse: function (e) {
        this.setState({ usePrincipleOfReUse: e.target.value });
        console.log(this.state.usePrincipleOfReUse);
    },

    haveMaterialSafetyDataSheet: function (e) {
        this.setState({ haveMaterialSafetyDataSheet: e.target.value });
        console.log(this.state.haveMaterialSafetyDataSheet);
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
                                                    <td>Is your company ISO 14001 "Environmental Management System" Certified? </td>
                                                    <td><select value={this.state.environmentalManagementSystemCertified} className="form-control" onChange={this.environmentalManagementSystemCertified}><option>NO</option><option>YES</option></select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Does your company have an Environmental Management Policy?</td>
                                                    <td>
                                                        <select value={this.state.environmentalManagementPolicy} className="form-control" onChange={this.environmentalManagementPolicy}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Is your company registered with SAATCA or SACNASP?</td>
                                                    <td>
                                                        <select value={this.state.registeredWithSaatcaOrSacnasp} className="form-control" onChange={this.registeredWithSaatcaOrSacnasp}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>Does your company have environmental initiatives to reduce your company's carbon footprint?</td>
                                                    <td>
                                                        <select value={this.state.reduceCarbonFootPrint} className="form-control" onChange={this.reduceCarbonFootPrint}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>Can your company provide an Environmental Incident Procedure or Instruction?</td>
                                                    <td>
                                                        <select value={this.state.enviromentalIncidentProcedure} className="form-control" onChange={this.enviromentalIncidentProcedure}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>Are your drivers licensed to transport the cargo as per Environmental Legislation?</td>
                                                    <td>
                                                        <select value={this.state.driversLicensedToTransportCargo} className="form-control" onChange={this.drivesLicensedToTransportCargo}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td>Does your company supply hazardous goods?</td>
                                                    <td>
                                                        <select value={this.state.supplyHazardousGoods} className="form-control" onChange={this.supplyHazardousGoods}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td>Does your company have a 16-point MSDS (Material Safety Data Sheet) for each hazardous material /chemical that you can deliver? Type in full name as per MSDS and upload MSDS document</td>
                                                    <td>
                                                        <input type="text" value={this.state.haveMaterialSafetyDataSheet} className="form-control" onChange={this.haveMaterialSafetyDataSheet}>
                                                    
                                                        </input>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>9</td>
                                                    <td>Does your company transport waste to licensed waste facilities or landfill sites?</td>
                                                    <td><select value={this.state.transportWasteToLicensedWasteFacilities} className="form-control" onChange={this.transportWasteToLicensedWasteFacilities}><option>NO</option><option>YES</option></select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>10</td>
                                                    <td>Are your delivery trucks marked with the correct signage as per Hazardous Classification?</td>
                                                    <td>
                                                        <select value={this.state.trucksMarkedWithCorrectSignage} className="form-control" onChange={this.trucksMarkedWithCorrectSignage}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>11</td>
                                                    <td>Can you provide a Waste Disposal Procedure or Instruction?</td>
                                                    <td>
                                                        <select value={this.state.provideWasteDisposalProcedure} className="form-control" onChange={this.provideWasteDisposalProcedure}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>12</td>
                                                    <td>Does your company have the necessary permits to transport the type of waste you collect and transport?</td>
                                                    <td>
                                                        <select value={this.state.permitsToTransportWaste} className="form-control" onChange={this.permitsToTransportWaste}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>13</td>
                                                    <td>Are trucks regularly serviced and roadworthy?</td>
                                                    <td>
                                                        <select value={this.state.trucksRegularlyServiced} className="form-control" onChange={this.trucksRegularlyServiced}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>14</td>
                                                    <td>Can your company provide a Spill Clean Up Procedure or Instruction?</td>
                                                    <td>
                                                        <select value={this.state.provideSpillCLeanUpProcedure} className="form-control" onChange={this.provideSpillCLeanUpProcedure}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>15</td>
                                                    <td>Can your company provide a Housekeeping Procedure or Instruction?</td>
                                                    <td>
                                                        <select value={this.state.provideHousekeepingProcedure} className="form-control" onChange={this.provideHousekeepingProcedure}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>16</td>
                                                    <td>Does your company use the principle of Re-Use, Reduce, and Recycle?</td>
                                                    <td>
                                                        <select value={this.state.usePrincipleOfReUse} className="form-control" onChange={this.usePrincipleOfReUse}>>
                                                           <option>NO</option><option>YES</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="2" style={lastTR}>I confirm that the above information and documents are correct and valid
                                                        <input style={checkBox} type="checkbox"></input>
                                                    </td>
                                                    <td>
                                                        <button type="button" className="btn btn-primary" onClick={this.ISO14001InfoPOST}>Save</button>
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