import { IsEmail, IsNotEmpty, MinLength, Validate } from "class-validator";
import { Transform } from "class-transformer";
import { IsNotExist } from "@core/validators/is-not-exists.validator";

export class CreateUserDto {
	@Transform(({ value }) => value.toLowerCase().trim())
	@Validate(IsNotExist, ["User"], {
		message: "Email already exists!",
	})
	@IsEmail()
	email: string;

	@MinLength(6)
	password: string;

	@IsNotEmpty()
	firstName: string;

	@IsNotEmpty()
	lastName: string;

	hash?: string;
}
