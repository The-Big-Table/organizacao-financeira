import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    BadGatewayException,
    InternalServerErrorException,
    BadRequestException, Param, ParseIntPipe
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {Usuarios} from "./usuario.entity";
import {AuthService} from "../auth/auth.service";

@Controller('usuarios')
export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService, private readonly authService: AuthService) {}

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
    async login(@Body() body: { email: string; senha: string }) {
        try {
            const usuario = await this.usuarioService.LoginUsuario(body.email);
            if (!usuario) {
                throw new BadRequestException('Usuário não encontrado'); // retorna 400
            }

            // Verifica a senha
            const token = await this.authService.ValidarUsuario(body.email, body.senha)
            if (!token) {
                throw new BadRequestException('Credenciais inválidas'); // retorna 400
            }

            return { access_token: token };
        } catch (error) {
            throw new InternalServerErrorException("Erro interno no servidor ao processar login!"); // retorna 500
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async id(@Param('id', ParseIntPipe) id: number ): Promise<Usuarios | null>{
        
    }
}