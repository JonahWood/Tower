import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/Constants";

const ObjectId = Schema.Types.ObjectId
export const TicketSchema = new Schema({
eventId: { type: ObjectId, required: true, ref: 'TowerEvent' },
accountId: { type: ObjectId, required: true, ref: 'Account' },
}, defaultSchemaOptions)

TicketSchema.virtual('profile', {
localField: 'accountId',
ref: 'Account',
foreignField: '_id',
justOne: true
}),

TicketSchema.virtual('towerEvent', {
    localField: 'eventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true
})