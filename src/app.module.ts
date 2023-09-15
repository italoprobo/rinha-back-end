import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasController } from './pessoas/pessoas.controller';
import { PessoasService } from './pessoas/pessoas.service';

@Module({
  imports: [],
  controllers: [AppController, PessoasController],
  providers: [AppService, PessoasService],
})
export class AppModule {}
