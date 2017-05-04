export class Command {
  constructor(
      id: number,
      totalPrice: number,
      totalQuantity: number,
      creationDate: string,
      // more params
      lines: CommandLines[];
  ) {}

}
