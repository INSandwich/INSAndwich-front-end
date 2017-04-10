export class Product {
  constructor(
    private _id: number,
    public name: string,
    public description: string,
    public available: number,
    public image: string,
    public price: number,
    public categoryId: number
  ){}
}
