import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({ nullable: true, type: "timestamptz" })
	createdAt: Date;

	@Column({ nullable: true, type: "timestamptz" })
	updatedAt: Date;

	@Column({ default: false })
	isDeleted: boolean;

	@BeforeInsert()
	updateDateCreation() {
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	@BeforeUpdate()
	async updateDateUpdate() {
		this.updatedAt = new Date();
	}
}
