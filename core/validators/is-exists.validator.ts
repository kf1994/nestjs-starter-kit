import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { getConnection } from 'typeorm';

@ValidatorConstraint({ name: 'IsExist', async: true })
export class IsExist implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments: ValidationArguments) {
    const repository = validationArguments.constraints[0];
    const pathToProperty = validationArguments.constraints[1];
    const entity: unknown = await getConnection()
      .getRepository(repository)
      .findOne({
        [pathToProperty ? pathToProperty : validationArguments.property]: pathToProperty ? value?.[pathToProperty] : value,
      });

    return Boolean(entity);
  }
}
