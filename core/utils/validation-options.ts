import { HttpStatus, ValidationError, ValidationPipeOptions } from "@nestjs/common";
import { ValidationFailed } from "@core/exceptions";

const validationOptions: ValidationPipeOptions = {
	transform: true,
	whitelist: true,
	errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
	exceptionFactory: (errors: ValidationError[]) =>
		new ValidationFailed(
			errors.reduce(
				(accumulator, currentValue) => ({
					...accumulator,
					[currentValue.property]: Object.values(currentValue.constraints).join(", "),
				}),
				{},
			),
		),
};

export default validationOptions;
