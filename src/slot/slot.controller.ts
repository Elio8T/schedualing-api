import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { slotService } from './slot.service';
@Controller('slot')
export class slotsController {
    constructor(private readonly slotsService: slotService) {}
    
    @Post()
    async addslot(@Body('info') info: string, 
    @Body('triplog') slottriplog: string,
    @Body('misc') slotgenre: string,
    @Body('GasBal') slotGasBal: number,
    @Body('Miles') slotMiles: number,
    ) {
        const generatedID = await this.slotsService.insertslot(info, slottriplog, slotgenre, slotGasBal, slotMiles);
        return {id: generatedID};
    }
    @Get()
    async getAllslot(){
        const slots = await this.slotsService.getslot(); 
        return slots;
    }
    @Get(':id')
    getslot(@Param('id') id: string){
        return this.slotsService.getSingleslot(id);
        

    }
    @Get('id/:info')
    getslotbyid(@Param('info') info: string){
        return this.slotsService.getbyinfo(info);
    }
    @Patch(':id')
    async updateslot(@Param('id') id: string, @Body('info') info: string, @Body('infoription') slottriplog: string, @Body('misc') slotgenre: string, @Body('GasBal') slotGasBal: number, @Body('Miles') slotMiles: number){
        await this.slotsService.updateslot(id, info, slottriplog, slotgenre, slotGasBal, slotMiles);
        return null;
    }


    @Delete(':id')
    async removeslot(@Param('id') id: string,){
        await this.slotsService.deleteslot(id);
        return null;
    }
}
