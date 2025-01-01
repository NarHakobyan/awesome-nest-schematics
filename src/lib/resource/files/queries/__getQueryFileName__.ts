import type { ICommand } from '@nestjs/cqrs';

export class <%= getQueryClassName %> implements ICommand {
  constructor(
    public readonly userId: Uuid,
) {}
}
