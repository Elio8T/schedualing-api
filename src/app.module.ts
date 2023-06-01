import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { slotModule } from './slot/slot.module';
import { tripModule } from './triplog/trip.module';



@Module({
  imports: [ slotModule, tripModule, MongooseModule.forRoot(
    'mongodb+srv://Elio:Elio@cluster0.ixwyjp5.mongodb.net/nestjs'
  )],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

