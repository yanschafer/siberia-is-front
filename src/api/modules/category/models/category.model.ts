import ApiCrudModelUtil from "@/api/utils/crud/api-crud-model.util";
import CategoryInputDto from "@/api/modules/category/dto/category-input.dto";
import CategoryDto from "@/api/modules/category/dto/category.dto";
import CategoryUpdateDto from "@/api/modules/category/dto/category-update.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import RemoveResultDto from "@/api/utils/crud/dto/remove-result.dto";
import CategoryRemoveDto from "@/api/modules/category/dto/category-remove.dto";

export default class CategoryModel extends ApiCrudModelUtil<CategoryInputDto, CategoryDto, CategoryUpdateDto> {
  constructor() {
    super("/category");
  }

  override async getAll(): Promise<ApiResponseDto<CategoryDto[]>> {
    return super.getAll(null);
  }

  async remove(modelId: number, categoryRemoveDto: CategoryRemoveDto): Promise<ApiResponseDto<RemoveResultDto>> {
    return super.remove(modelId, categoryRemoveDto);
  }
}