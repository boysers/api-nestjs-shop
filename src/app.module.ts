import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/api-nestjs-shop'),
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
