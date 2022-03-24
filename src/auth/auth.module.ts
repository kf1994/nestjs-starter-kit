import { Module } from "@nestjs/common";
import { AuthController } from "@app/auth/auth.controller";
import { AuthService } from "@app/auth/auth.service";
import { UsersModule } from "@app/users/users.module";

@Module({
	imports: [UsersModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {
}