import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/users/users.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [],
	exports: [],
	providers: [],
})
export class UsersModule {}
