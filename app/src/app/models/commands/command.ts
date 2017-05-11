import { CommandLines } from './command-lines';

export class Command {
  Id: number;
  totalPrice: number;
  totalQuantity: number;
  creationDate: string;
  // more params
  lines: CommandLines[];
  constructor(
      Id: number,
      totalPrice: number,
      totalQuantity: number,
      creationDate: string,
      // more params
      lines: CommandLines[]
  ) {}

}
