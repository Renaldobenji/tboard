using System.Data.Entity;
using Microsoft.Practices.Unity;
using System.Web.Http;
using TBoard.BusinessLogic.BusinessLogic;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Repository;
using Unity.WebApi;
using TBoard.Web.Services;
using TBoard.Web.Controllers;

namespace TBoard.Web
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            container.RegisterType<TBoardEntities, TBoardEntities>(new HierarchicalLifetimeManager());
            container.RegisterType<IUnitOfWork, UnitOfWork>(new HierarchicalLifetimeManager());

            container.RegisterType<IAuthenticationService, AuthenticationService>();

            container.RegisterType<CommunicationBusinessLogic, CommunicationBusinessLogic>();
            container.RegisterType<AddressBusinessLogic, AddressBusinessLogic>();
            container.RegisterType<OrganizationBusinessLogic, OrganizationBusinessLogic>();
            container.RegisterType<UserBusinessLogic, UserBusinessLogic>();
            container.RegisterType<DocumentBusinessLogic, DocumentBusinessLogic>();
            container.RegisterType<DocumentRequirementBusinessLogic, DocumentRequirementBusinessLogic>();
            container.RegisterType<BankAccountBusinessLogic, BankAccountBusinessLogic>();
            container.RegisterType<BankAccountTypeBusinessLogic, BankAccountTypeBusinessLogic>();
            container.RegisterType<ExpertiseCategoryBusinessLogic, ExpertiseCategoryBusinessLogic>();
            container.RegisterType<ExpertiseOwnershipBusinessLogic, ExpertiseOwnershipBusinessLogic>();
            container.RegisterType<ExpertiseOwnershipRepository, ExpertiseOwnershipRepository>();
            container.RegisterType<RFQBusinessLogic, RFQBusinessLogic>();
            container.RegisterType<EmailQueueBusinessLogic, EmailQueueBusinessLogic>();
            container.RegisterType<QuoteBusinessLogic, QuoteBusinessLogic>();
            container.RegisterType<QuoteRepository, QuoteRepository>();
            container.RegisterType<RatingRepository, RatingRepository>();
            container.RegisterType<ConfigRepository, ConfigRepository>();

            container.RegisterType<ConfigBusinessLogic, ConfigBusinessLogic>();
            container.RegisterType<RatingBusinessLogic, RatingBusinessLogic>();
            container.RegisterType<UserRepository, UserRepository>();
            container.RegisterType<CommunicationRepository, CommunicationRepository>();
            container.RegisterType<AddressRepository, AddressRepository>();
            container.RegisterType<OrganizationRepository, OrganizationRepository>();
            container.RegisterType<DocumentRepository, DocumentRepository>();
            container.RegisterType<DocumentRequirementsRepository, DocumentRequirementsRepository>();
            container.RegisterType<ExpertiseCategoryRepository, ExpertiseCategoryRepository>();
            container.RegisterType<RFQRepository, RFQRepository>();
            container.RegisterType<EmailQueueRepository, EmailQueueRepository>();

            container.RegisterType<BankAccountRepository, BankAccountRepository>();
            container.RegisterType<BankAccountTypesRepository, BankAccountTypesRepository>();

            container.RegisterType<AdminFunctionController, AdminFunctionController>();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}