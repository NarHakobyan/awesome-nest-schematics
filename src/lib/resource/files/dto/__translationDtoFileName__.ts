import { AbstractTranslationDto } from '../../../common/dto/abstract.dto.ts';
import type { <%= translationEntityClassName %> } from '../<%= translationEntityFileName %>.ts';
import { LanguageCode } from '../../../constants/language-code.ts';
import { EnumField } from '../../../decorators/field.decorators.ts';

export class <%= translationDtoClassName %> extends AbstractTranslationDto {
@EnumField(() => LanguageCode)
  languageCode: LanguageCode;

  constructor(<%= translationEntityVarName %>: <%= translationEntityClassName %>) {
    super(<%= translationEntityVarName %>);

    this.languageCode = <%= translationEntityVarName %>.languageCode;
  }
}
