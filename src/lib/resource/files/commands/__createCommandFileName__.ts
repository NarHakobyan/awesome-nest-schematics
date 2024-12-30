import type { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { find } from 'lodash';

import type { <%= createDtoClassName %> } from '../dtos/<%= createDtoFileName %>';
import type { <%= entityClassName %> } from '../<%= entityFileName %>';
import { <%= repositoryClassName %> } from '../<%= repositoryFileName %>';
import type { <%= translationEntityClassName %> } from '../<%= translationEntityFileName %>';
import { <%= translationRepositoryClassName %> } from '../<%= translationRepositoryFileName %>';

export class <%= createCommandClassName %> implements ICommand {
  constructor(
    public readonly <%= createDtoVarName %>: <%= createDtoClassName %>,
) {}
}

@CommandHandler(<%= createCommandClassName %>)
export class <%= createHandlerClassName %>
  implements ICommandHandler<<%= createCommandClassName %>, <%= entityClassName %>>
{
  constructor(
    private <%= repositoryVarName %>: <%= repositoryClassName %>,
  private <%= translationRepositoryVarName %>: <%= translationRepositoryClassName %>,
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
      description: find(<%=createDtoVarName %>.description, {
      languageCode,
    })!.text,
  });

    translations.push(translationEntity);
  }

  await this.<%= translationRepositoryVarName %>.save(translations);

  entity.translations = translations;

  return entity;
}
}
