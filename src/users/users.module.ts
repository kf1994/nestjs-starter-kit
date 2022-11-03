import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/users/users.entity";
import { UsersService } from "@app/users/users.service";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [],
	exports: [UsersService],
	providers: [UsersService],
})
export class UsersModule {}
