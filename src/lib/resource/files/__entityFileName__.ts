import type { Relation } from 'typeorm';
import { Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';
import { <%= dtoClassName %>, I<%= dtoClassName %>Options } from './dto/<%= dtoFileName %>.ts';
import { <%= translationEntityClassName %> } from './<%= translationEntityFileName %>.ts';

@Entity({ name: '<%= tableName %>' })
@UseDto(<%= dtoClassName %>)
export class <%= entityClassName %> extends AbstractEntity<<%= dtoClassName %>, I<%= dtoClassName %>Options> {
  @OneToMany(
    () => <%= translationEntityClassName %>,
    (<%= translationEntityVarName %>) => <%= translationEntityVarName %>.<%= foreignKeyFieldName %>,
)
declare translations: Relation<<%= translationEntityClassName %>[]>;
}
