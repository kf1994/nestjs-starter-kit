import { Transform } from "class-transformer";
import { IsEmail, IsOptional, MinLength, Validate } from "class-validator";
import { IsNotExist } from "@core/validators/is-not-exists.validator";

export class UpdateUserDto {
	@Transform(({ value }) => value?.toLowerCase().trim())
	@IsOptional()
	@Validate(IsNotExist, ["User"], {
		message: "Email already exists!",
	})
	@IsEmail()
	email?: string | null;

	@IsOptional()
	@MinLength(6)
	password?: string;

	@IsOptional()
	firstName?: string | null;

	@IsOptional()
	lastName?: string | null;

	hash?: string | null;
}
