import * as mongoose from 'mongoose';

export const tripSchema = new mongoose.Schema({
    driveEmail: {type: String, required: true},
    group: {type: String, required: true},
    misc: {type: String, required: false},
    timeout: {type: Number, required: false},
    timein: {type: Number, required: false},
});


export interface trip extends mongoose.Document{
    
    id: string;
    driveEmail: string;
    group: string;
    misc: string;
    timeout: number;
    timein: number;
}




