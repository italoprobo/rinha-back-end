import {IsNotEmpty, IsString, IsOptional, IsArray, Matches, Length} from 'class-validator'

export class Pessoas {

    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    apelido: string

    @IsNotEmpty()
    @IsString()
    nome: string

    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'O campo de nascimento deve estar no formato AAAA-MM-DD' })
    nascimento: string

    @IsNotEmpty()
    @IsArray()
    @IsString({each: true})
    @Length(1, 32, { each: true, message: 'Cada elemento do campo stack deve ter no máximo 32 caracteres' })
    stack?: string[] 
}