import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { tripsController } from './trip.controller';
import { tripService } from './trip.service';
import { tripSchema } from './trip.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'trip', schema: tripSchema}]), ],
    controllers: [tripsController],
    providers: [tripService],

})

export class tripModule {}