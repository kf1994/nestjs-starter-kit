import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Allow } from "class-validator";
import { BaseEntity } from "@core/utils/base-entity";
import { User } from "@app/users/users.entity";

@Entity()
export class Forgot extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Allow()
	@Column()
	@Index()
	hash: string;

	@Allow()
	@ManyToOne(() => User, {
		eager: true,
	})
	user: User;
}
