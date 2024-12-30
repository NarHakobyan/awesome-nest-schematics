import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from 'typeorm-transactional';

import type { PageDto } from '../../common/dto/page.dto';
import { ValidatorService } from '../../shared/services/validator.service';
import { <%= createCommandClassName %> } from './commands/<%= createCommandFileName %>';
import type { <%= dtoClassName %> } from './dtos/<%= dtoFileName %>';
import type { <%= pageOptionsDtoClassName %> } from './dtos/<%= pageOptionsDtoFileName %>';
import { <%= notFoundExceptionClassName %> } from './exceptions/<%= notFoundExceptionFileName %>';
import type { <%= entityClassName %> } from './<%= entityFileName %>';
import { <%= repositoryClassName %> } from './<%= repositoryFileName %>';
import { <%= createDtoClassName %> } from './dtos/<%= createDtoFileName %>';
import type { <%= updateDtoClassName %> } from './dtos/<%= updateDtoFileName %>';

@Injectable()
export class <%= serviceClassName %> {
  constructor(
    private <%= repositoryVarName %>: <%= repositoryClassName %>,
  private validatorService: ValidatorService,
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
