import mongoose from 'mongoose'
import { TicketsController } from '../controllers/TicketsController';
import { AccountSchema } from '../models/Account'
import { TicketSchema } from '../models/Ticket';
import { TowerEventSchema } from '../models/TowerEvent';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema)

  Tickets = mongoose.model('Ticket', TicketSchema)
}

export const dbContext = new DbContext()
