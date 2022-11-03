import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class AuthUpdateDto {
	@IsOptional()
	@IsNotEmpty({ message: "firstName is empty" })
	firstName?: string;

	@IsOptional()
	@IsNotEmpty({ message: "lastName is empty" })
	lastName?: string;

	@IsOptional()
	@IsNotEmpty()
	@MinLength(6)
	password?: string;

	@IsOptional()
	@IsNotEmpty({ message: "Old password is required" })
	oldPassword: string;
}
