export class Product {
  constructor(
    public Id: number,
    public Name: string,
    public Description: string,
    public Available: number,
    public Image: string,
    public Price: number,
    public CategoryId: number
  ){}
}
