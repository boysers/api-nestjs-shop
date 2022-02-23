import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
// import { ShopModule } from './shop/shop.module';
import mongoose from 'mongoose';

mongoose
  .connect(`mongodb://localhost/api-nestjs-shop`)
  .then(() => {
    console.log('Connexion à MongoDB réussie !');
  })
  .catch(() => {
    console.log('Connexion à MongoDB échouée !');
  });

@Module({
  /* imports: [
    MongooseModule.forRoot('mongodb://localhost/api-nestjs-shop'),
    ShopModule,
  ], */
  controllers: [AppController, ShopController],
  providers: [AppService, ShopService],
})
export class AppModule {}
