import { Controller, Get, Param, 
    Post, Body, Res, Query, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { Response } from 'express';
import { Pessoas } from './pessoas.model';

@Controller('pessoas')
export class PessoasController {
    constructor(private readonly pessoasServices: PessoasService){}

    @Post()
    async create(@Body() pessoa: Pessoas) {
        try {
            const criarPessoa = this.pessoasServices.create(pessoa)
            return {
                id: criarPessoa.id,
                ...pessoa,
            }
        } catch (error) {
            return {
                message: 'Erro ao criar a pessoa'
            }
        }
    }

    @Get(':id/')
    findById(@Res() res: Response, @Param('id') id: string) {
        try {
            const pessoa = this.pessoasServices.findById(id)
            if(!pessoa) {
                return {
                    message: 'Pessoa não encontrada'
                }
            }
            return pessoa
        } catch (error) {
            return {
                    message: 'Erro ao buscar a pessoa'
            }
        }

    }

    @Get()
    search(@Query('t') termo: string){
        if (!termo) {
            throw new HttpException('O parâmetro "t" é obrigatório na query string.', HttpStatus.BAD_REQUEST);
        }
        return this.pessoasServices.searchByTerm(termo)
    }

    @Get('contagem-pessoas')
    @HttpCode(HttpStatus.OK)
    count(){
        return this.pessoasServices.qtdPessoas()
    }
}
