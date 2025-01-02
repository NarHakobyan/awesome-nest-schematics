import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

import { <%= queryClassName %> } from './<%= queryFileName %>.ts';

@QueryHandler(<%= queryClassName %>)
export class <%= handlerClassName %>
  implements IQueryHandler<<%= queryClassName %>>
{
  constructor() {}

  async execute(query: <%= queryClassName %>) {

  }
}
