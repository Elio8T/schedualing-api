import * as mongoose from 'mongoose';

export const slotSchema = new mongoose.Schema({
    info: {type: String, required: true},
    triplog: {type: String, required: true},
    misc: {type: String, required: false},
    GasBal: {type: Number, required: false},
    Miles: {type: Number, required: false},
});


export interface slot extends mongoose.Document{
    
    id: string;
    info: string;
    triplog: string;
    misc: string;
    GasBal: number;
    Miles: number;
}




