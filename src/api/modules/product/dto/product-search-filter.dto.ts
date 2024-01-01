import FieldSearchWrapperDto from "@/api/utils/crud/dto/field-search-wrapper.dto";

class ProductFilterDto {
  constructor(
    public vendorCode: string | null,
    public brand: number[] | null,
    public name: string | null,
    public description: string | null,
    public purchasePrice: FieldSearchWrapperDto,
    public distributorPrice: FieldSearchWrapperDto,
    public professionalPrice: FieldSearchWrapperDto,
    public commonPrice: FieldSearchWrapperDto,
    public category: number[] | null,
    public collection: number[] | null,
    public color: string | null,
    public amountInBox: FieldSearchWrapperDto
  ) {
  }
}

export default class ProductSearchFilterDto {
  constructor(
    public filters: ProductFilterDto
  ) {
  }
}