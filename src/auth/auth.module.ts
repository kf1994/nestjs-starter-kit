import { Module } from "@nestjs/common";
import { AuthController } from "@app/auth/auth.controller";
import { AuthService } from "@app/auth/auth.service";
import { UsersModule } from "@app/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ForgotModule } from "@app/forgot/forgot.module";
import { JwtStrategy } from "@app/auth/strategies/jwt.strategy";

@Module({
	imports: [
		UsersModule,
		ForgotModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get("auth.secret"),
				signOptions: {
					expiresIn: configService.get("auth.expires"),
				},
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {
}
