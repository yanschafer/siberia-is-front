import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";

export default class ProductGroupInputDto {
  constructor(
    public name: string,
    public products: number[],
  ) {}
}
