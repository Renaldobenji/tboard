using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Mvc;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;

namespace TBoard.Web
{
    public static class Bootstrapper
    {
        /// <summary>
        /// Initialises this instance.
        /// </summary>
        /// <returns></returns>
        public static IUnityContainer Initialise()
        {
            var container = BuildUnityContainer();

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));

            return container;
        }

        /// <summary>
        /// Builds the unity container.
        /// </summary>
        /// <returns></returns>
        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();
            RegisterTypes(container);

            return container;
        }

        /// <summary> 
        /// Registers the types.
        /// </summary>
        /// <param name="container">The container.</param>
        public static void RegisterTypes(IUnityContainer container)
        {
            // register all your components with the container here
            // it is NOT necessary to register your controllers
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

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}