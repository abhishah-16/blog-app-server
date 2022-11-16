import { Post } from "src/post/entities/post.entity";
import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import * as bcrypt from "bcryptjs"
import { userRoles } from "../user.roles";

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

    @Column({ select: false })
    password: string

    @Column({ default: null })
    profilePic: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @Column({ type: 'enum', enum: userRoles, default: userRoles.Reader })
    roles: userRoles

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 12);
    }
}
