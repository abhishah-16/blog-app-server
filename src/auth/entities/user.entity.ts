import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    profilePic: string

}
