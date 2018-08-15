using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TBoard.Data.Model;

namespace TBoard.Data.Repository
{
    public class CommunicationRepository : Repository<Model.communication>
    {
        public CommunicationRepository(TBoardEntities dbContext)
            : base(dbContext)
        {
                
        }

        public IList<CommunicationDTO> GetCommunication(string ownerType, string ownerID)
        {
            var comm = (from com in this._dbContext.communications
                        where com.owningType == ownerType && com.owningID == ownerID
                        select com).ToList();

            var list = new List<CommunicationDTO>();

            foreach (var x in comm)
            {
                var exist = list.FirstOrDefault(y => y.role == x.role);
                if (exist == null)
                {
                    var item = new CommunicationDTO();
                    item.owningID = x.owningID;
                    item.owningType = x.owningType;
                    item.role = x.role;
                    item.communicationID = x.communicationID;
                    if (x.communicationtype.communicationTypeTLA == "HME")
                    {
                        item.Home = x.communicationLine1;
                    }
                    if (x.communicationtype.communicationTypeTLA == "CELL")
                    {
                        item.CellPhone = x.communicationLine1;
                    }
                    if (x.communicationtype.communicationTypeTLA == "WRK")
                    {
                        item.WorkPhone = x.communicationLine1;
                    }
                    if (x.communicationtype.communicationTypeTLA == "EML")
                    {
                        item.Email = x.communicationLine1;
                    }
                    list.Add(item);
                }
                else
                {
                    if (x.communicationtype.communicationTypeTLA == "HME")
                    {
                        list.First(d => d.communicationID == exist.communicationID).Home = x.communicationLine1;
                    }
                    if (x.communicationtype.communicationTypeTLA == "CELL")
                    {                        
                        list.First(d => d.communicationID == exist.communicationID).CellPhone = x.communicationLine1;
                    }
                    if (x.communicationtype.communicationTypeTLA == "WRK")
                    {                       
                        list.First(d => d.communicationID == exist.communicationID).WorkPhone = x.communicationLine1;
                    }
                    if (x.communicationtype.communicationTypeTLA == "EML")
                    {                       
                        list.First(d => d.communicationID == exist.communicationID).Email = x.communicationLine1;
                    }
                }
                        
            }

            return list;
        }
    }
}
