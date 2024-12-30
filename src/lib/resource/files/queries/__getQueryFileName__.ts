import type { ICommand } from '@nestjs/cqrs';

import { <%= repositoryClassName %> } from '../<%= repositoryFileName %>';

export class <%= getQueryClassName %> implements ICommand {
  constructor(
    public readonly userId: Uuid,
) {}
}
