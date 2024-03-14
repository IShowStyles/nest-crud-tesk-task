import { Injectable } from '@nestjs/common';
import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';
import { ValidationException } from '../exceptions';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(CustomValidationPipe.formatErrors(errors)),
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  }

  private static formatErrors(errors: ValidationError[]): any {
    return errors.reduce((acc, err) => {
      const childrenErrors =
        err.children && err.children.length > 0
          ? CustomValidationPipe.formatErrors(err.children)
          : {};
      return {
        ...acc,
        [err.property]:
          Object.keys(childrenErrors).length > 0
            ? childrenErrors
            : err.constraints,
      };
    }, {});
  }
}
