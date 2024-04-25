import ProductInputDto from "@/api/modules/product/dto/product-input.dto";

export default class ProductParseResultDto {
  constructor(
    public brandMap: any,
    public collectionMap: any,
    public categoryMap: any,
    public createList: ProductInputDto[],
  ) {}
}
