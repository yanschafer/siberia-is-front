export default class ProductListItemDto {
  constructor(
    public id: number,
    public name: string,
    public vendorCode: string,
    public quantity: number,
    public price: number
  ) {
  }
}