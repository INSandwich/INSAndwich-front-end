import { CommandLines } from './command-lines';

export class Command {
  constructor(
      id: number,
      totalPrice: number,
      totalQuantity: number,
      creationDate: string,
      // more params
      lines: CommandLines[]
  ) {}

}
