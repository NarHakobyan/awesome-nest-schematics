import type { Relation } from 'typeorm';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractTranslationEntity } from '../../common/abstract.entity.ts';
import { <%= translationDtoClassName %> } from './dto/<%= translationDtoFileName %>.ts';
import { <%= entityClassName %> } from './<%= entityFileName %>.ts';
import { UseDto } from '../../decorators/use-dto.decorator.ts';

@Entity({ name: '<%= translationsTableName %>' })
@UseDto(<%= translationDtoClassName %>)
export class <%= translationEntityClassName %> extends AbstractTranslationEntity<<%= translationDtoClassName %>> {
  @Column({ type: 'uuid' })
    <%= foreignKeyFieldName %>!: Uuid;

@ManyToOne(() => <%= entityClassName %>, (entity) => entity.translations, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
@JoinColumn({ name: '<%= foreignKeyColumnName %>' })
<%= fieldName %>!: Relation<<%= entityClassName %>>;
}
