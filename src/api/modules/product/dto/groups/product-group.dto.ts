import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";

export default class ProductGroupDto {
  constructor(
    public id: number,
    public name: string,
    public products: ProductListItemDto[],
  ) {}
}
