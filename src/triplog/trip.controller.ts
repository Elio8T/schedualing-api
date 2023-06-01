import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { tripService } from './trip.service';
@Controller('trip')
export class tripsController {
    constructor(private readonly tripsService: tripService) {}
    
    @Post()
    async addtrip(@Body('driveEmail') driveEmail: string, 
    @Body('group') tripgroup: string,
    @Body('misc') tripgenre: string,
    @Body('timeout') triptimeout: number,
    @Body('timein') triptimein: number,
    ) {
        const generatedID = await this.tripsService.inserttrip(driveEmail, tripgroup, tripgenre, triptimeout, triptimein);
        return {id: generatedID};
    }
    @Get()
    async getAlltrip(){
        const trips = await this.tripsService.gettrip(); 
        return trips;
    }
    @Get(':id')
    gettrip(@Param('id') id: string){
        return this.tripsService.getSingletrip(id);
        

    }
    @Get('id/:driveEmail')
    gettripbyid(@Param('driveEmail') driveEmail: string){
        return this.tripsService.getbydriveEmail(driveEmail);
    }
    @Patch(':id')
    async updatetrip(@Param('id') id: string, @Body('driveEmail') driveEmail: string, @Body('driveEmailription') tripgroup: string, @Body('misc') tripgenre: string, @Body('timeout') triptimeout: number, @Body('timein') triptimein: number){
        await this.tripsService.updatetrip(id, driveEmail, tripgroup, tripgenre, triptimeout, triptimein);
        return null;
    }


    @Delete(':id')
    async removetrip(@Param('id') id: string,){
        await this.tripsService.deletetrip(id);
        return null;
    }
}
