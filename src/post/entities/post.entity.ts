import { User } from "src/auth/entities/user.entity"
import { Category } from "src/category/entities/category.entity"
import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"
import slugify from 'slugify';
import { Exclude } from "class-transformer";

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

    @Column({ default: 1 })
    @Exclude()
    userId: number

    @Column({ default: 6 })
    @Exclude()
    categoryId: number

    @ManyToOne(() => User, (user) => user.posts, {
        eager: true,
    })
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id'
    })
    user: User

    @ManyToOne(() => Category, (category) => category.posts, {
        eager: true
    })
    @JoinColumn({
        name: 'categoryId',
        referencedColumnName: 'id'
    })
    category: Category

    @BeforeInsert()
    slugifyPost() {
        this.slug = slugify(this.title, {
            lower: true,
            replacement: '_'
        })
    }
}
