import { IsNotEmpty, Validate } from "class-validator";
import { Transform } from "class-transformer";
import { IsExist } from "@core/validators/is-exists.validator";

export class AuthLoginDto {
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsExist, ["User"], {
    message: "user doesnt exists!",
  })
  email: string;

  @IsNotEmpty()
  password: string;
}
