var Admin = React.createClass({
    render: function () {

        var navBarSyle = {
            marginBottom: 0
        };
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top" role="navigation" style={navBarSyle}>
                    <NavHeader />
                    <NavMenu />
                </nav>
                <div id="page-wrapper">

                </div>
            </div>
        )
    }
});