import { Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { <%= dtoClassName %> } from './dtos/<%= dtoFileName %>';
import { <%= translationEntityClassName %> } from './<%= translationEntityFileName %>';

@Entity({ name: '<%= tableName %>' })
@UseDto(<%= dtoClassName %>)
export class <%= entityClassName %> extends AbstractEntity<<%= dtoClassName %>, <%= dtoClassName %>> {
  @OneToMany(
    () => <%= translationEntityClassName %>,
    (<%= translationEntityVarName %>) => <%= translationEntityVarName %>.<%= foreignKeyFieldName %>,
)
translations: <%= translationEntityClassName %>[];
}
