import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Usuarios} from "./usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuarios)
        private usuarioRepository: Repository<Usuarios>,
    ) {}

    async CriandoUsuario(usuario: Usuarios): Promise<Usuarios> {
        const novoUsuario = this.usuarioRepository.create(usuario);
        return await this.usuarioRepository.save(novoUsuario);

    }

    async LoginUsuario(email: string): Promise<Usuarios | null>{
        return await this.usuarioRepository.findOne({where: {email}});
    }

    async BuscandoUserID (id: number): Promise<Usuarios | null>{
        return await this.usuarioRepository.findOne({where: {id}})
    }
}