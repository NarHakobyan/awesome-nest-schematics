import { NotFoundException } from '@nestjs/common';

export class <%= notFoundExceptionClassName %> extends NotFoundException {
  constructor(error?: string) {
    super('error.<%= notFoundExceptionClassName %>', error);
  }
}
