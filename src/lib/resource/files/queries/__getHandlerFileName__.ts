import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';

import { <%= repositoryClassName %> } from '../<%= repositoryFileName %>';

@QueryHandler(<%= getQueryClassName %>)
export class <%= getHandlerClassName %> implements IQueryHandler<<%= getQueryClassName %>> {
  constructor(private <%= repositoryVarName %>: <%= repositoryClassName %>) {}

async execute(query: <%= getQueryClassName %>) {
  return this.<%= repositoryVarName %>.find({
    userId: query.userId,
  });
}
}
