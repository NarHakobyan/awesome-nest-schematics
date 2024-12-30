import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractTranslationEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { <%= translationDtoClassName %> } from './dtos/<%= translationDtoFileName %>';
import { <%= entityClassName %> } from './<%= entityFileName %>';

@Entity({ name: '<%= translationsTableName %>' })
@UseDto(<%= translationDtoClassName %>)
export class <%= translationEntityClassName %> extends AbstractTranslationEntity<<%= translationDtoClassName %>> {
  @Column({ type: 'uuid' })
    <%= foreignKeyFieldName %>: Uuid;

@ManyToOne(() => <%= entityClassName %>, (entity) => entity.translations, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
@JoinColumn({ name: '<%= foreignKeyColumnName %>' })
<%= foreignKeyFieldName %>: <%= entityClassName %>;
}
