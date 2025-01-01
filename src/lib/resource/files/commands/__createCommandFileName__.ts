import type { ICommand } from '@nestjs/cqrs';

import type { <%= createDtoClassName %> } from '../dto/<%= createDtoFileName %>.ts';

export class <%= createCommandClassName %> implements ICommand {
  constructor(
    public readonly <%= createDtoVarName %>: <%= createDtoClassName %>,
) {}
}
