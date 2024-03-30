import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";

export default class ProductGroupUpdateDto {
  constructor(
    public name: string | null = null,
    public products: number[] | null = null,
  ) {}
}
