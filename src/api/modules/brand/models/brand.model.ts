import BrandDto from "@/api/modules/brand/dto/brand.dto";
import BrandInputDto from "@/api/modules/brand/dto/brand-input.dto";
import BrandUpdateDto from "@/api/modules/brand/dto/brand-update.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import ApiCrudModelUtil from "@/utils/crud/api-crud-model.util";

export default class BrandModel extends ApiCrudModelUtil<BrandInputDto, BrandDto, BrandUpdateDto>{
  constructor() {
    super("/brand");
  }

  override async getAll(): Promise<ApiResponseDto<BrandDto[]>> {
    return super.getAll(null);
  }
}