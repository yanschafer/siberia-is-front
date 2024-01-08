import StockDto from "@/api/modules/stock/dto/stock.dto";
import StockInputDto from "@/api/modules/stock/dto/stock-input.dto";
import StockUpdateDto from "@/api/modules/stock/dto/stock-update.dto";
import {StockSearchDto} from "@/api/modules/stock/dto/stock-search-filter.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import StockListItemDto from "@/api/modules/stock/dto/stock-list-item.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import ApiCrudModelUtil from "../../../../utils/crud/api-crud-model.util";

export default class StockModel extends ApiCrudModelUtil<StockInputDto, StockDto, StockUpdateDto>{
  constructor() {
    super("/stock");
  }
  public async getList(stockSearchDto: StockSearchDto): Promise<ApiResponseDto<StockListItemDto>> {
    return this.authorizedRequest(new ApiRequestDto("/all", "POST", stockSearchDto))
  }
}