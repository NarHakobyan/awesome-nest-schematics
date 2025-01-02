import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import { <%= commandClassName %> } from './<%= commandFileName %>.ts';

@CommandHandler(<%= commandClassName %>)
export class <%= handlerClassName %>
  implements ICommandHandler<<%= commandClassName %>>
{
  constructor() {}

  async execute(command: <%= commandClassName %>) {

  }
}
