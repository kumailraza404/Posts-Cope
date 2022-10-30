/* eslint-disable prettier/prettier */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'kumailposts' })
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    desc: string;

    @ManyToOne(() => User, (user) => user.post)
    user: User;
}
