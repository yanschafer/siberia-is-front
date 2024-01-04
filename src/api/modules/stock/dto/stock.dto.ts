import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";

export default class StockDto {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public products: ProductListItemDto[]
  ) {
  }
}