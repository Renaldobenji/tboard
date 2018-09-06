/*Register Page*/
var FinanceInformation = React.createClass({

    getInitialState: function () {
        return {
            OrganizationInformation: [],
            DocumentRequirements: [],
            OrganizationID: "",
            UserID: ""
        };
    },

    componentWillMount: function () {
        var tokens = new TboardJWTToken();
        var decodedToken = tokens.getJWTToken();
        this.setState({ OrganizationID: decodedToken.OrganizationID });
        this.setState({ UserID: decodedToken.UserID });
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

        var radioButton = {
            verticalAlign: "middle",
            marginTop: "-1px"
        };

        var radioButtonText = {
            verticalAlign: "middle"
        }

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
                                                    <td>Does your company have an appointed accountant?</td>
                                                    <td><select className="form-control"><option>YES</option><option>NO</option></select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>What is your company's public interest score?</td>
                                                    <td>
                                                        <input style={radioButton} id="100" type="radio" name="gender" value="100">
                                                        </input>
                                                        <span style={radioButtonText}> Less than 100 (No mention and audit required) Attach letter from accountant confirming the score</span><br></br>

                                                        <input style={radioButton} id="100350" type="radio" name="gender" value="100350"></input>
                                                        <span style={radioButtonText}> Between 100 - 350. Attach letter from accountant confirming that an independent review has been done on the previous financial year</span><br></br>

                                                        <input style={radioButton} id="100350" type="radio" name="gender" value="100350"></input>
                                                        <span style={radioButtonText}> Greater than 350. Attach letter to confirm that an audit was done for the previous financial year</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Does your company make use of an electronic accounting system such as pastel?</td>
                                                    <td><select className="form-control"><option>YES</option><option>NO</option></select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="3" style={lastTR}>I confirm that the above information and documents are correct and valid
                                                        <input style={checkBox} type="checkbox"></input>
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

