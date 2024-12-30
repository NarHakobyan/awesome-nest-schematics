import { AbstractTranslationDto } from '../../../common/dto/abstract.dto';
import { LanguageCode } from '../../../constants';
import { ApiEnumPropertyOptional } from '../../../decorators';
import type { <%= translationEntityClassName %> } from '../<%= translationEntityFileName %>';

export class <%= translationDtoClassName %> extends AbstractTranslationDto {
@ApiEnumPropertyOptional(() => LanguageCode)
  languageCode: LanguageCode;

  constructor(<%= translationEntityVarName %>: <%= translationEntityClassName %>) {
    super(<%= translationEntityVarName %>);

    this.languageCode = <%= translationEntityVarName %>.languageCode;
  }
}
