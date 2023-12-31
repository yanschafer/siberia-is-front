import ApiCrudModelUtil from "@/api/utils/crud/api-crud-model.util";
import ProductInputDto from "@/api/modules/product/dto/product-input.dto";
import ProductDto from "@/api/modules/product/dto/product.dto";
import ProductUpdateDto from "@/api/modules/product/dto/product-update.dto";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";

export default class ProductModel extends ApiCrudModelUtil<ProductInputDto, ProductDto, ProductUpdateDto>{
  constructor() {
    super("/product");
  }

  override async getAll(searchFilterDto: ProductSearchFilterDto): Promise<ApiResponseDto<ProductDto[]>> {
    return super.getAll(searchFilterDto);
  }
}