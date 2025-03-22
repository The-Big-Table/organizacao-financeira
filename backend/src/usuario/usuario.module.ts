import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Usuarios} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Usuarios])],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [UsuarioService],
})

export class UsuarioModule{}