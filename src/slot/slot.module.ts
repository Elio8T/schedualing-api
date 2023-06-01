import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { slotsController } from './slot.controller';
import { slotService } from './slot.service';
import { slotSchema } from './slot.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'slot', schema: slotSchema}]), ],
    controllers: [slotsController],
    providers: [slotService],

})

export class slotModule {}