import {Injectable, NotFoundException} from '@nestjs/common';
import { slot } from './slot.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';




@Injectable()
export class slotService{
    
 
    constructor(@InjectModel('slot') private readonly slotModel: Model<slot>) {}


    async insertslot(info: string, triplog: string, misc: string, GasBal: number, Miles: number ){
       
        
        const newslot = new this.slotModel({
            info: info, 
            triplog: triplog,
            misc, 
            GasBal,
            Miles,
        });
        const result = await  newslot.save();
        return result.id as string;
     

    }

    async getslot(){
       const slots = await  this.slotModel.find().exec();
    
        return slots.map((slot) => ({id: slot.id, info: slot.info, triplog: slot.triplog, misc: slot.misc, GasBal: slot.GasBal, Miles: slot.Miles}));
    }

    async getSingleslot(ID: string){
        const slot = await this.findslot(ID);
        return {id: slot.id, info: slot.info, triplog: slot.triplog, misc: slot.misc, GasBal: slot.GasBal, Miles: slot.Miles};
    }
    async getbyinfo(info: string){
        const slot = await this.findslotbyID(info);
        return {id: slot.id, info: slot.info, triplog: slot.triplog, misc: slot.misc, GasBal: slot.GasBal, Miles: slot.Miles};
    }

   

    async updateslot(ID: string, info: string, triplog: string, misc: string, GasBal: number, Miles: number){
        const updatedslot = await this.findslot(ID);
        
        if(info){
            updatedslot.info = info;
        }
        if(triplog){
            updatedslot.triplog = triplog;
        }
        if(misc){
            updatedslot.misc = misc;
        }
        if(GasBal){
            updatedslot.GasBal = GasBal;
        }
        if(Miles){
            updatedslot.Miles = Miles;
        }
        updatedslot.save();
    }


    async deleteslot(ID: string){
        const result = await this.slotModel.deleteOne({_id: ID}).exec();
        if (result.deletedCount ===0){
            throw new NotFoundException('could not find');
        }
    }
    private async findslot(id: string): Promise<slot>{
        let slot;
        try{
        slot = await this.slotModel.findById(id).exec();
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!slot){
            throw new NotFoundException('could not find');
        }
        return slot;
    }
    private async findslotbyID(info: string): Promise<slot>{
        let slot;
        try{

            const a =await this.slotModel.find();
            console.log(a[0]);
            console.log(a[0].id);
        
        for(let x = 0; x<a.length; x++){
           // console.log(this.slotModel.findOne( info));
            if(a[x].info === info){
                slot = await this.slotModel.findById(a[x].id).exec();

            }
        }
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!slot){
            throw new NotFoundException('could not find');
        }
        return slot;
    }

    
   

    

}