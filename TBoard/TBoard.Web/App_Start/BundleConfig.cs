using System.Web;
using System.Web.Optimization;
using System.Web.Optimization.React;

namespace TBoard.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            bundles.Add(new Bundle("~/bundles/myjsx", new IBundleTransform[]
            {
                // This works the same as BabelBundle (transform then minify) but you could
                //add your own transforms as well.
                new BabelTransform()
                //,new JsMinify(),
            }).Include(
                "~/Scripts/reactLogic/rfqbid.jsx",
                "~/Scripts/reactLogic/rfqdetail.jsx",
                 "~/Scripts/reactLogic/rfqmine.jsx",
                 "~/Scripts/reactLogic/rfqcreate.jsx",
                 "~/Scripts/reactLogic/document.jsx",
                "~/Scripts/reactLogic/users.jsx",
                "~/Scripts/reactLogic/dashboard.jsx",
                "~/Scripts/reactLogic/organization.jsx",
                "~/Scripts/reactLogic/navheader.jsx",
                "~/Scripts/reactLogic/navmenu.jsx",
                "~/Scripts/reactLogic/admin.jsx",
                "~/Scripts/reactLogic/registration.jsx",
                "~/Scripts/reactLogic/app.jsx"
            ));
        }
    }
}