import ProductInputDto from "@/api/modules/product/dto/product-input.dto";
import ProductDto from "@/api/modules/product/dto/product.dto";
import ProductUpdateDto from "@/api/modules/product/dto/product-update.dto";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import ProductListItemDto from "@/api/modules/product/dto/product-list-item.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import ApiCrudModelUtil from "@/utils/crud/api-crud-model.util";
import ProductGroupInputDto from "@/api/modules/product/dto/groups/product-group-input.dto";
import ProductGroupDto from "@/api/modules/product/dto/groups/product-group.dto";
import ProductGroupUpdateDto from "@/api/modules/product/dto/groups/product-group-update.dto";
import ProductGroupListItemDto from "@/api/modules/product/dto/groups/product-group-list-item.dto";
import MassiveUpdateDto from "@/api/modules/product/dto/groups/massive-update.dto";
import ProductGroupActionResultDto from "@/api/modules/product/dto/groups/product-group-action-result.dto";

export default class ProductGroupModel extends ApiCrudModelUtil<
  ProductGroupInputDto,
  ProductGroupDto,
  ProductGroupUpdateDto
> {
  constructor() {
    super("/product/groups");
  }

  public async apply(
    groupId: number,
    updateDto: MassiveUpdateDto,
  ): Promise<ApiResponseDto<ProductGroupActionResultDto>> {
    return this.authorizedRequest(
      new ApiRequestDto(`/${groupId}/apply`, "POST", updateDto),
    );
  }
}
