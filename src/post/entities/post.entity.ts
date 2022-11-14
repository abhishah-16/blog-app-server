import { User } from "src/auth/entities/user.entity"
import { Category } from "src/category/entities/category.entity"
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    slug: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date

    @Column()
    mainImageUrl: string

    @ManyToOne(() => User, (user) => user.posts, {
        eager: true,
    })
    user: User

    @ManyToOne(() => Category, (category) => category.posts, {
        eager: true
    })
    category: Category
}
