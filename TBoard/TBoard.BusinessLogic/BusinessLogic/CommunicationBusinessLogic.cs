using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Interfaces;
using TBoard.Data.Model;
using TBoard.Data.Model.Refactored;
using TBoard.Data.Repository;

namespace TBoard.BusinessLogic.BusinessLogic
{
    public class CommunicationBusinessLogic : BusinessLogic<communication>
    {
        private CommunicationRepository repository;
        public CommunicationBusinessLogic(IUnitOfWork unitOfWork, CommunicationRepository repository) : base(unitOfWork, repository)
        {
            this.repository = repository;
        }

        public IList<CommunicationDTO> GetCommunication(string ownerType, string ownerID)
        {
            return this.repository.GetCommunication(ownerType, ownerID);
        }

        /// <summary>
        /// Updates the communication if the type of communication exists for the owner, else creates a new communication type
        /// </summary>
        /// <param name="ownerType">The type of ownser (ORG,PER)</param>
        /// <param name="ownerID">The identity of the owner</param>
        /// <param name="communicationTypeTLA">The type of communication (CELL,WRK,HME,EML)</param>
        /// <param name="communicationValue">The phone number, work number, email address etc</param>
        /// <param name="role"></param>
        public void SaveCommunication(string ownerType, string ownerID, string communicationTypeTLA, string communicationValue, string role)
        {
            var communication =
                   this.FindBy(
                       x =>
                           x.owningType == ownerType && x.owningID == ownerID &&
                           x.communicationtype.communicationTypeTLA == communicationTypeTLA && x.role == role).FirstOrDefault();

            //Update existing communication
            if (communication != null)
            {
                communication.communicationLine1 = communicationValue;
                this.Update(communication);
            }
            //Create a new communication
            else
            {
                addCommunication(ownerType, ownerID, communicationValue, communicationTypeTLA, role);
            }
        }

        private void addCommunication(string owingType, string owningID, string communicationLine1,
            string communicationType, string role)
        {
            if (!string.IsNullOrEmpty(communicationLine1))
            {
                communication comm = new communication();
                comm.owningType = owingType;
                comm.owningID = owningID;
                comm.communicationLine1 = communicationLine1;
                comm.role = role;
                if (communicationType.Equals("CELL"))
                {
                    comm.communicationTypeID = 1;
                }
                else if (communicationType.Equals("WRK"))
                {
                    comm.communicationTypeID = 2;
                }
                else if (communicationType.Equals("HME"))
                {
                    comm.communicationTypeID = 3;
                }
                else if (communicationType.Equals("EML"))
                {
                    comm.communicationTypeID = 4;
                }
                this.Create(comm);
            }
        }
    }
}
