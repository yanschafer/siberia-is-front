import ApiCrudModelUtil from "@/utils/crud/api-crud-model.util";
import GalleryInputDto from "@/api/modules/gallery/dto/gallery-input.dto";
import GalleryOutputDto from "@/api/modules/gallery/dto/gallery-output.dto";
import GalleryUpdateDto from "@/api/modules/gallery/dto/gallery-update.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";

export default class GalleryModel extends ApiCrudModelUtil<
  GalleryInputDto,
  GalleryOutputDto,
  GalleryUpdateDto
> {
  constructor() {
    super("/gallery");
  }

  public async getPaths(ids: number[]): Promise<ApiResponseDto<string[]>> {
    return this.authorizedRequest(new ApiRequestDto("/paths", "POST", { ids }));
  }
}
