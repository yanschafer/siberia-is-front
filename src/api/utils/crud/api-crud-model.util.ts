import ApiModelUtil from "@/api/utils/api-model.util";
import ApiResponseDto from "@/api/dto/api-response.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import RemoveResultDto from "@/api/utils/crud/dto/remove-result.dto";

export default class ApiCrudModelUtil<Input, Output, Update> extends ApiModelUtil {
  constructor(public baseUri: string) {
    super(`${baseUri}`);
  }

  public async create(inputDto: Input): Promise<ApiResponseDto<Output>> {
    return this.authorizedRequest(new ApiRequestDto("", "POST", inputDto))
  }

  public async getAll<Filter>(searchFilterDto: Filter | null = null): Promise<ApiResponseDto<Output[]>> {
    if (searchFilterDto == null)
      return this.authorizedRequest(new ApiRequestDto("", "GET"))
    else
      return this.authorizedRequest(new ApiRequestDto("/all", "POST", searchFilterDto))
  }

  public async getOne(modelId: number): Promise<ApiResponseDto<Output>> {
    return this.authorizedRequest(new ApiRequestDto(`/${modelId}`, "GET"))
  }

  public async update(modelId: number, updateDto: Update): Promise<ApiResponseDto<Output>> {
    return this.authorizedRequest(new ApiRequestDto(`/${modelId}`, "PATCH", updateDto))
  }

  public async remove<T>(modelId: number, data: T | null = null): Promise<ApiResponseDto<RemoveResultDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${modelId}`, "DELETE", data))
  }

}