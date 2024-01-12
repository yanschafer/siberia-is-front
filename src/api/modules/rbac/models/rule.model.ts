import ApiModelUtil from "@/utils/api-model.util";
import ApiRequestDto from "@/api/dto/api-request.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import RuleDto from "@/api/modules/rbac/dto/rules/rule.dto";

export default class RuleModel extends ApiModelUtil {
  constructor() {
    super("/rules");
  }

  async getAll(): Promise<ApiResponseDto<RuleDto[]>> {
    return await this.authorizedRequest(new ApiRequestDto("", "GET"));
  }
}
