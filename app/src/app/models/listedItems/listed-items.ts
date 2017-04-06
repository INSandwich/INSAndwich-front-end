export class ListedItems<T> {
  constructor(
    public pageSize: number,
    public pageNumber: number,
    public items: T[]
  ){}
}
