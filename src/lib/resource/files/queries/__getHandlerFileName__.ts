import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { <%= getQueryClassName %> } from './<%= getQueryFileName %>.ts';
import { <%= entityClassName %> } from '../<%= entityFileName %>.ts';

@QueryHandler(<%= getQueryClassName %>)
export class <%= getHandlerClassName %> implements IQueryHandler<<%= getQueryClassName %>> {
  constructor(
    @InjectRepository(<%= entityClassName %>)
    private <%= repositoryVarName %>: Repository<<%= entityClassName %>>,
  ) {}

async execute(query: <%= getQueryClassName %>) {
  return this.<%= repositoryVarName %>.find({
    userId: query.userId,
  });
}
}
