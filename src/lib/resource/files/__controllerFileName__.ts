import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import type { PageDto } from '../../common/dto/page.dto';
import { <%= createDtoClassName %> } from './dto/<%= createDtoFileName %>.ts';
import type { <%= dtoClassName %> } from './dto/<%= dtoFileName %>.ts';
import { <%= pageOptionsDtoClassName %> } from './dto/<%= pageOptionsDtoFileName %>.ts';
import { <%= updateDtoClassName %> } from './dto/<%= updateDtoFileName %>.ts';
import { <%= serviceClassName %> } from './<%= serviceFileName %>.ts';
import { Auth, UUIDParam } from '../../decorators/http.decorators.ts';

@Controller('<%= controllerName %>')
export class <%= controllerClassName %> {
  constructor(private <%= serviceVarName %>: <%= serviceClassName %>) {}

@Post()
@Auth([])
@HttpCode(HttpStatus.CREATED)
async <%= createFunctionName %>(@Body() <%= createDtoVarName %>: <%= createDtoClassName %>) {
  const entity = await this.<%= serviceVarName %>.<%= createFunctionName %>(<%= createDtoVarName %>);

  return entity.toDto();
}

@Get()
@Auth([])
@HttpCode(HttpStatus.OK)
<%= getAllFunctionName %>(@Query() <%= pageOptionsDtoVarName %>: <%= pageOptionsDtoClassName %>): Promise<PageDto<<%= dtoClassName %>>> {
  return this.<%= serviceVarName %>.<%= getAllFunctionName %>(<%= pageOptionsDtoVarName %>);
}

@Get(':id')
@Auth([])
@HttpCode(HttpStatus.OK)
async <%= getSingleFunctionName %>(@UUIDParam('id') id: Uuid): Promise<<%= dtoClassName %>> {
  const entity = await this.<%= serviceVarName %>.<%= getSingleFunctionName %>(id);

  return entity.toDto();
}

@Put(':id')
@HttpCode(HttpStatus.ACCEPTED)
<%= updateFunctionName %>(
@UUIDParam('id') id: Uuid,
  @Body() <%= updateDtoVarName %>: <%= updateDtoClassName %>,
): Promise<void> {
  return this.<%= serviceVarName %>.<%= updateFunctionName %>(id, <%= updateDtoVarName %>);
}

@Delete(':id')
@HttpCode(HttpStatus.ACCEPTED)
async <%= deleteFunctionName %>(@UUIDParam('id') id: Uuid): Promise<void> {
  await this.<%= serviceVarName %>.<%= deleteFunctionName %>(id);
}
}
