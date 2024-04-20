import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";

export default class ExportConfigDto {
  constructor(
    public searchFilters: ProductSearchFilterDto,
    public fieldsDemand: any,
  ) {}
}
