import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { <%= entityClassName %> } from '../<%= entityFileName %>.ts';
import { <%= translationEntityClassName %> } from '../<%= translationEntityFileName %>.ts';
import { <%= createCommandClassName %> } from './<%= createCommandFileName %>.ts';

@CommandHandler(<%= createCommandClassName %>)
export class <%= createHandlerClassName %>
  implements ICommandHandler<<%= createCommandClassName %>, <%= entityClassName %>>
{
  constructor(
    @InjectRepository(<%= entityClassName %>)
    private <%= repositoryVarName %>: Repository<<%= entityClassName %>>,
@InjectRepository(<%= translationEntityClassName %>)
private <%= translationRepositoryVarName %>: Repository<<%= translationEntityClassName %>>,
) {}

async execute(command: <%= createCommandClassName %>) {
  const { <%=createDtoVarName %> } = command;
  const entity = this.<%= repositoryVarName %>.create();
  const translations: <%= translationEntityClassName %>[] = [];

  await this.<%= repositoryVarName %>.save(entity);

  // FIXME: Create generic function for translation creation
  for (const createTranslationDto of <%=createDtoVarName %>.title) {
    const languageCode = createTranslationDto.languageCode;
    const translationEntity = this.<%= translationRepositoryVarName %>.create({
    <%= foreignKeyFieldName %>: entity.id,
      languageCode,
      title: createTranslationDto.text,
      description: <%=createDtoVarName %>.description.find(item => item.languageCode === languageCode)!.text,
  });

    translations.push(translationEntity);
  }

  await this.<%= translationRepositoryVarName %>.save(translations);

  entity.translations = translations;

  return entity;
}
}
