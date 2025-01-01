import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from 'typeorm-transactional';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import type { PageDto } from '../../common/dto/page.dto.ts';
import { <%= createCommandClassName %> } from './commands/<%= createCommandFileName %>.ts';
import type { <%= dtoClassName %> } from './dto/<%= dtoFileName %>.ts';
import type { <%= pageOptionsDtoClassName %> } from './dto/<%= pageOptionsDtoFileName %>.ts';
import { <%= notFoundExceptionClassName %> } from './exceptions/<%= notFoundExceptionFileName %>.ts';
import { <%= entityClassName %> } from './<%= entityFileName %>.ts';
import { <%= createDtoClassName %> } from './dto/<%= createDtoFileName %>.ts';
import type { <%= updateDtoClassName %> } from './dto/<%= updateDtoFileName %>.ts';

@Injectable()
export class <%= serviceClassName %> {
  constructor(
    @InjectRepository(<%= entityClassName %>)
    private <%= repositoryVarName %>: Repository<<%= entityClassName %>>,
  private commandBus: CommandBus,
) {}

@Transactional()
<%= createFunctionName %>(<%= createDtoVarName %>: <%= createDtoClassName %>): Promise<<%= entityClassName %>> {
  return this.commandBus.execute<<%= createCommandClassName %>, <%= entityClassName %>>(
  new <%= createCommandClassName %>(<%= createDtoVarName %>),
);
}

async <%= getAllFunctionName %>(
  <%= pageOptionsDtoVarName %>: <%= pageOptionsDtoClassName %>,
): Promise<PageDto<<%= dtoClassName %>>> {
  const queryBuilder = this.<%= repositoryVarName %>
  .createQueryBuilder('<%= tableAliasName %>')
    .leftJoinAndSelect('<%= tableAliasName %>.translations', '<%= tableAliasName %>Translation');
  const [items, pageMetaDto] = await queryBuilder.paginate(<%= pageOptionsDtoVarName %>);

  return items.toPageDto(pageMetaDto);
}

async <%= getSingleFunctionName %>(id: Uuid): Promise<<%= entityClassName %>> {
  const queryBuilder = this.<%= repositoryVarName %>
  .createQueryBuilder('<%= tableAliasName %>')
    .where('<%= tableAliasName %>.id = :id', { id });

  const entity = await queryBuilder.getOne();

if (!entity) {
  throw new <%= notFoundExceptionClassName %>();
}

return entity;
}

async <%= updateFunctionName %>(
  id: Uuid,
  <%= updateDtoVarName %>: <%= updateDtoClassName %>,
): Promise<void> {
  const queryBuilder = this.<%= repositoryVarName %>
  .createQueryBuilder('<%= tableAliasName %>')
    .where('<%= tableAliasName %>.id = :id', { id });

  const entity = await queryBuilder.getOne();

if (!entity) {
  throw new <%= notFoundExceptionClassName %>();
}

this.<%= repositoryVarName %>.merge(entity, <%= updateDtoVarName %>);

await this.<%= repositoryVarName %>.save(<%= updateDtoVarName %>);
}

async <%= deleteFunctionName %>(id: Uuid): Promise<void> {
  const queryBuilder = this.<%= repositoryVarName %>
  .createQueryBuilder('<%= tableAliasName %>')
    .where('<%= tableAliasName %>.id = :id', { id });

  const entity = await queryBuilder.getOne();

if (!entity) {
  throw new <%= notFoundExceptionClassName %>();
}

await this.<%= repositoryVarName %>.remove(entity);
}
}
