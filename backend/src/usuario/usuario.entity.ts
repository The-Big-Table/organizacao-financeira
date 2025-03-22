import{Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('usuarios')
export class Usuarios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({unique: true})
    email: string;

    @Column()
    senha: string;

    @Column()
    telefone: string;
}