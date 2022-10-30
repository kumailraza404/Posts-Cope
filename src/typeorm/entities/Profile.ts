import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_profiles_kumail' })
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;
}