import {Injectable, NotFoundException} from '@nestjs/common';
import { trip } from './trip.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';




@Injectable()
export class tripService{
    
 
    constructor(@InjectModel('trip') private readonly tripModel: Model<trip>) {}


    async inserttrip(driveEmail: string, group: string, misc: string, timeout: number, timein: number ){
       
        
        const newtrip = new this.tripModel({
            driveEmail: driveEmail, 
            group: group,
            misc, 
            timeout,
            timein,
        });
        const result = await  newtrip.save();
        return result.id as string;
     

    }

    async gettrip(){
       const trips = await  this.tripModel.find().exec();
    
        return trips.map((trip) => ({id: trip.id, driveEmail: trip.driveEmail, group: trip.group, misc: trip.misc, timeout: trip.timeout, timein: trip.timein}));
    }

    async getSingletrip(ID: string){
        const trip = await this.findtrip(ID);
        return {id: trip.id, driveEmail: trip.driveEmail, group: trip.group, misc: trip.misc, timeout: trip.timeout, timein: trip.timein};
    }
    async getbydriveEmail(driveEmail: string){
        const trip = await this.findtripbyID(driveEmail);
        return {id: trip.id, driveEmail: trip.driveEmail, group: trip.group, misc: trip.misc, timeout: trip.timeout, timein: trip.timein};
    }

   

    async updatetrip(ID: string, driveEmail: string, group: string, misc: string, timeout: number, timein: number){
        const updatedtrip = await this.findtrip(ID);
        
        if(driveEmail){
            updatedtrip.driveEmail = driveEmail;
        }
        if(group){
            updatedtrip.group = group;
        }
        if(misc){
            updatedtrip.misc = misc;
        }
        if(timeout){
            updatedtrip.timeout = timeout;
        }
        if(timein){
            updatedtrip.timein = timein;
        }
        updatedtrip.save();
    }


    async deletetrip(ID: string){
        const result = await this.tripModel.deleteOne({_id: ID}).exec();
        if (result.deletedCount ===0){
            throw new NotFoundException('could not find');
        }
    }
    private async findtrip(id: string): Promise<trip>{
        let trip;
        try{
        trip = await this.tripModel.findById(id).exec();
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!trip){
            throw new NotFoundException('could not find');
        }
        return trip;
    }
    private async findtripbyID(driveEmail: string): Promise<trip>{
        let trip;
        try{

            const a =await this.tripModel.find();
            console.log(a[0]);
            console.log(a[0].id);
        
        for(let x = 0; x<a.length; x++){
           // console.log(this.tripModel.findOne( driveEmail));
            if(a[x].driveEmail === driveEmail){
                trip = await this.tripModel.findById(a[x].id).exec();

            }
        }
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!trip){
            throw new NotFoundException('could not find');
        }
        return trip;
    }

    
   

    

}