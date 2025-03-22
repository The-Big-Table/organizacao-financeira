import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    BadGatewayException,
    InternalServerErrorException,
    BadRequestException
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {Usuarios} from "./usuario.entity";

@Controller('usuarios')
export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED) // retorna 201
    async RegisterUsuario(@Body() usuario: Usuarios ): Promise<Usuarios>{
        try{
            return await this.usuarioService.CriandoUsuario(usuario);
        } catch (error){
            if (error instanceof BadGatewayException){
                throw new BadRequestException('Erro ao criar o usuário' + error.message); // retorna 400
            }
            throw new InternalServerErrorException("Erro interno no servidor!"); //retorna 500
        }

    }

    @Post('login')
    @HttpCode(HttpStatus.OK) // retorna 200
    async login(@Body() body: {email: string}): Promise<Usuarios | null> {
        try{
            const usuario = await this.usuarioService.LoginUsuario(body.email);
            if(!usuario){
                throw new BadRequestException('Usuario não encontrado'); // retorna 400
            }
            return usuario;
        } catch (error){
            throw new InternalServerErrorException("Erro interno no servidor ao processar login!"); //retorna 500
        }

    }
}