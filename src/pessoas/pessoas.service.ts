import { Get, Injectable } from '@nestjs/common';
import { Pessoas } from './pessoas.model';
import { uuid } from 'uuidv4'

@Injectable()
export class PessoasService {
    private pessoas: Pessoas[] = []

    create(pessoa: Pessoas) {
        const jaExiste = this.pessoas.find(pess => pess.apelido === pessoa.apelido)

        if (pessoa.nome === null || pessoa.nome === undefined) {
            throw new Error('O campo "nome" é obrigatório.');
          }

        if(jaExiste) {
            throw new Error('Pessoa com apelido duplicado!')
        }

        const novaPessoa = { id: uuid(), ...pessoa}
        this.pessoas.push(novaPessoa)
        return novaPessoa
    }

    findById(id: string) {
        return this.pessoas.find(pess => pess.id === id)
    }

    searchByTerm(termo: string){
        return this.pessoas.filter(p =>
            p.apelido.includes(termo) || p.nome.includes(termo) || (p.stack && p.stack.includes(termo)),
          );
    }

    qtdPessoas(){
        return this.pessoas.length
    }
}
