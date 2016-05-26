using System.Data.Entity;
using Microsoft.Practices.Unity;
using System.Web.Http;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;
using Unity.WebApi;

namespace TBoard.Web
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            container.RegisterType<DbContext, TBoardEntities>(new HierarchicalLifetimeManager());
            container.RegisterType<IUnitOfWork, UnitOfWork>(new HierarchicalLifetimeManager());

            container.RegisterType<CommunicationBusinessLogic, CommunicationBusinessLogic>();
            container.RegisterType<AddressBusinessLogic, AddressBusinessLogic>();
            container.RegisterType<OrganizationBusinessLogic, OrganizationBusinessLogic>();
            container.RegisterType<UserBusinessLogic, UserBusinessLogic>();

            container.RegisterType<UserRepository, UserRepository>();
            container.RegisterType<CommunicationRepository, CommunicationRepository>();
            container.RegisterType<AddressRepository, AddressRepository>();
            container.RegisterType<OrganizationRepository, OrganizationRepository>();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
            // e.g. container.RegisterType<ITestService, TestService>();
            
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}