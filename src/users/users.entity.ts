import {
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { BaseEntity } from "@core/utils/base-entity";

@Entity()
export class User extends BaseEntity {
	@Column({ unique: true })
	email: string;

	@Column({ nullable: true })
	password: string;

	public previousPassword: string;

	@AfterLoad()
	public loadPreviousPassword(): void {
		this.previousPassword = this.password;
	}

	@BeforeInsert()
	@BeforeUpdate()
	async setPassword() {
		if (this.previousPassword !== this.password && this.password) {
			const salt = await bcrypt.genSalt();
			this.password = await bcrypt.hash(this.password, salt);
		}
	}

	@Column({ nullable: true })
	firstName: string | null;

	@Column({ nullable: true })
	lastName: string | null;

	@Column({ nullable: true })
	hash: string | null;

	@Column({ default: false })
	emailVerified: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
