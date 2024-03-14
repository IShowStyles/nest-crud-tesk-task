import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(response: any) {
    super(response, HttpStatus.BAD_REQUEST);
  }
}
