import ProductInputDto from "@/api/modules/product/dto/product-input.dto";
import ProductDto from "@/api/modules/product/dto/product.dto";
import ProductUpdateDto from "@/api/modules/product/dto/product-update.dto";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import ApiCrudModelUtil from "@/utils/crud/api-crud-model.util";

export default class ProductModel extends ApiCrudModelUtil<
  ProductInputDto,
  ProductDto,
  ProductUpdateDto
> {
  constructor() {
    super("/product");
  }

  async getList(
    searchFilterDto: ProductSearchFilterDto,
  ): Promise<ApiResponseDto<ProductListItemDto[]>> {
    return this.authorizedRequest(
      new ApiRequestDto("/all", "POST", searchFilterDto),
    );
  }

  override async getAll(
    searchFilterDto: ProductSearchFilterDto,
  ): Promise<ApiResponseDto<ProductDto[]>> {
    throw new DOMException("Not implemented");
  }

  async loadFile(file: File): Promise<ApiResponseDto<ProductInputDto[]>> {
    const csvData = await file.arrayBuffer();
    return this.authorizedRequest(
      new ApiRequestDto("/parse/csv", "POST", csvData),
    );
  }

  async bulkInsert(
    onUploadRows: ProductInputDto[],
  ): Promise<ApiResponseDto<ProductListItemDto[]>> {
    return this.authorizedRequest(
      new ApiRequestDto("/bulk", "POST", onUploadRows),
    );
  }
}
