import ApiCrudModelUtil from "@/utils/crud/api-crud-model.util";
import GalleryInputDto from "@/api/modules/gallery/dto/gallery-input.dto";
import GalleryOutputDto from "@/api/modules/gallery/dto/gallery-output.dto";
import GalleryUpdateDto from "@/api/modules/gallery/dto/gallery-update.dto";

export default class GalleryModel extends ApiCrudModelUtil<
  GalleryInputDto,
  GalleryOutputDto,
  GalleryUpdateDto
> {}
