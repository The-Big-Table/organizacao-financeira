import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsuarioService } from "../usuario/usuario.service";
import { Usuarios } from "../usuario/usuario.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private usuarioService: UsuarioService
    ) {}

    @Post("register")
    async register(@Body() usuario: Usuarios): Promise<Usuarios> {
        return this.usuarioService.CriandoUsuario(usuario);
    }

    @Post("login")
    async login(@Body() body: { email: string; senha: string }) {
        const usuario = await this.authService.ValidarUsuario(body.email, body.senha);
        return this.authService.login(usuario);
    }

    @Post("perfil")
    @UseGuards(AuthGuard("jwt")) // 🛡️ Protege a rota, requer um token válido
    async perfil(@Request() req) {
        return req.user; // Retorna os dados do usuário autenticado
    }
}
