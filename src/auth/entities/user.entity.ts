import { Post } from "src/post/entities/post.entity";
import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import * as bcrypt from "bcryptjs"
import { Exclude } from "class-transformer";

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

    @Column()
    profilePic: string

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12)
    }

}
