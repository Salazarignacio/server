import Ticket from "./models/ticket.model.js";
import Manager from "./Manager.js";

const TicketsManagerMongo = new Manager(Ticket)
export default TicketsManagerMongo