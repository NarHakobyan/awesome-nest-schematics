import { EntityRepository, Repository } from 'typeorm';

import { <%= translationEntityClassName %> } from './<%= translationEntityFileName %>';

@EntityRepository(<%= translationEntityClassName %>)
export class <%= translationRepositoryClassName %> extends Repository<<%= translationEntityClassName %>> {}
