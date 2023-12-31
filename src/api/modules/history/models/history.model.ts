import ApiRequestDto from "@/api/dto/api-request.dto";
import ApiModelUtil from "@/api/utils/api-model.util";
import ApiResponseDto from "@/api/dto/api-response.dto";
import HistoryRowDto from "@/api/modules/history/dto/history-row.dto";
import HistorySearchFilterDto from "@/api/modules/history/dto/history-search-filter.dto";

export default class HistoryModel extends ApiModelUtil {
  constructor() {
    super("/logs");
  }

  public async getAll(searchFilterDto: HistorySearchFilterDto): Promise<ApiResponseDto<HistoryRowDto[]>> {
    return this.authorizedRequest(new ApiRequestDto("", "POST", searchFilterDto))
  }
}