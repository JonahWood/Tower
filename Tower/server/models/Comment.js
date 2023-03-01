import { Schema } from "mongoose"
import { defaultSchemaOptions, basicStringType } from "../db/Constants";


const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema({
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    eventId: {type: ObjectId, required: true, ref: 'TowerEvent'},
    body: {...basicStringType, }

}, defaultSchemaOptions)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})