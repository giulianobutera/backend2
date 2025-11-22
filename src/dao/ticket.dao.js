const Ticket = require('../models/ticket');

class TicketDAO {
    async create(ticketData) {
        return await Ticket.create(ticketData);
    }
}

module.exports = new TicketDAO();
