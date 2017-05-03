export class ListedItems<T> {
  constructor(
    public pageSize: number,
    public pageNumber: number,
    public pageCnt: number,
    public items: T[]
  ){}
}
