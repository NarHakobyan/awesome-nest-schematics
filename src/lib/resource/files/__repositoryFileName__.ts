import { EntityRepository, Repository } from 'typeorm';

import { <%= entityClassName %> } from './<%= entityFileName %>';

@EntityRepository(<%= entityClassName %>)
export class <%= repositoryClassName %> extends Repository<<%= entityClassName %>> {}
