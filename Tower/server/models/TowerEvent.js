import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants.js";

export const TowerEventSchema = new Schema({

    name: basicStringType,
    description: {...basicStringType, maxLength: 5000},
    coverImg: {...basicStringType},
    location: basicStringType,
    capacity: {type: Number, required: true},
    startDate: {type: Date},
    isCanceled: {type: Boolean, default: false, required: true},
    type: {...basicStringType, enum: ['convention', 'concert', 'sport', 'digital']},
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }

}, defaultSchemaOptions)

TowerEventSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})