import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsuarioService} from "../usuario/usuario.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {Usuarios} from "../usuario/usuario.entity";
//Verificamos se o usuário existe.
//Compararmos a senha digitada com a senha criptografada no banco.
//Geramos um token JWT válido por 1 hora.

@Injectable()
export class AuthService{
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
    ) {}

    async ValidarUsuario(email: string, senha: string): Promise<any>{
        const usuario = await this.usuarioService.LoginUsuario(email);
        if(!usuario){
            throw new UnauthorizedException('Usuário não encontrado!');

        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida){
            throw new UnauthorizedException("Senha incorreta!");
        }

        const payload = {id: usuario.id, email: usuario.senha};
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
    async login(usuario: Usuarios): Promise<{ access_token: string }> {
        const payload = { email: usuario.email, sub: usuario.id }; // 🔐 Define os dados do token
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}


