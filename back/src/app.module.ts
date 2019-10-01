import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibrosModule } from './libros/libros.module';
import { CategoriasModule } from './categorias/categorias.module';

const URL = process.env.MONGODB;

@Module({
  imports: [
    LibrosModule, 
    CategoriasModule, 
    MongooseModule.forRoot(URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
