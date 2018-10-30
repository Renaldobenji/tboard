var DocumentRequirementsList = React.createClass({

    render: function () {
        var filePondInformationCollection = [];
        var filePondIds = [];

        //console.log({ this.props.DocumentRequirements });
        function onAfterTableComplete() {
            //console.log(documentRequirementArray);

            // Turn input element into a pond
            $('.filepondClassIdentifier').filepond();

            $('.filepondClassIdentifier').each(function () {
                var currentFilePondElement = $(this);
                for (var i = 0; i < filePondInformationCollection.length; i++) {
                    if (filePondInformationCollection[i].filePondID == $(this).attr("id")) {
                        $(currentFilePondElement).filepond({
                            allowMultiple: true,
                            server: filePondInformationCollection[i].uploadPath
                        });
                    }
                }
            });

            // Set allowMultiple property to true
            $('.filepondClassIdentifier').filepond('allowMultiple', true);

            // Listen for addfile event
            $('.filepondClassIdentifier').on('FilePond:addfile', function (e) {
                const inputElement = document.querySelector('input[type="file"]');
                // create the FilePond instance
                const pond = FilePond.create(inputElement);

                console.log('file added event', e);
            });

        }
        var options = {
            afterTableComplete: onAfterTableComplete // A hook for after table render complete.
        };

        function ResolveView(cell, row) {

            var uploadSyle = {
                'font-size': '8pt'
            };

            if (row.ResolvedDate == "") {
                var url = 'Upload/PostForm?&documentCode=' + row.RequirementName + '&key=' + row.OrgID;
                var filePondID = row.RequirementName .replace(/\s/g, '-');
                var filePondInformation = { uploadPath: url, filePondID: filePondID };

                filePondInformationCollection.push(filePondInformation);
                console.log(filePondInformationCollection);
                // return <div><a href={'Upload/DocumentTypeIndexEncrypted?&documentCode=' + row.RequirementName + '&key=' + row.OrgID} id="fakeLink" target="_blank"><button class="btn btn-outline btn-primary">Upload Document</button></a></div>    
                return <div className="form-group" style={{ uploadSyle }}>
                    <input id={filePondID} type="file"
                        className="filepond filepondClassIdentifier" data-file-metadata-hello="test"
                        name="filepond"></input>
                </div>
            }
            else
                return <div>Resolved</div>
        }

        return (
            <div className="panel panel-red">
                <div className="panel-heading">
                    Document Requirements
			            </div>
                <div className="panel-body">
                    <BootstrapTable data={this.props.DocumentRequirements} striped={true} hover={true} options={options}>
                        <TableHeaderColumn isKey={true} dataField="RequirementType">Requirement Type</TableHeaderColumn>
                        <TableHeaderColumn dataField="RequirementName">Document</TableHeaderColumn>
                        <TableHeaderColumn dataField="CreatedDate">Created</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ResolveView}>Resolution</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
});


var DocumentRequirementsSection = React.createClass({

    getInitialState: function () {
        return {
            DocumentRequirements: [],
            OrganizationID: "",
            UserID: "",

        };
    },

    fetchDocumentRequirements: function (orgID) {

        $.ajax({
            url: 'api/Requirement/DOCUMENTREQUIREMENT/ORG/' + orgID,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ DocumentRequirements: data });

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
                                Document Requirements
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