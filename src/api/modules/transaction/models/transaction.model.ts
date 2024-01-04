import ApiModelUtil from "@/api/utils/api-model.util";
import TransactionInputDto from "@/api/modules/transaction/dto/transaction-input.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import TransactionSimpleDto from "@/api/modules/transaction/dto/transaction-simple.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import TransactionListItemDto from "@/api/modules/transaction/dto/transaction-list-item.dto";
import ProductSearchFilterDto from "@/api/modules/product/dto/product-search-filter.dto";
import TransactionDto from "@/api/modules/transaction/dto/transaction.dto";

export default class TransactionModel extends ApiModelUtil {
  constructor(
    baseUrl: string
  ) {
    super(`/transaction/${baseUrl}`);
  }

  public async getAvailableFiltered(searchFilterDto: ProductSearchFilterDto): Promise<ApiResponseDto<TransactionListItemDto[]>> {
    return this.authorizedRequest(new ApiRequestDto("/all", "POST", searchFilterDto))
  }

  public async getOne(transactionId: number): Promise<ApiResponseDto<TransactionDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${transactionId}`, "GET"))
  }
  
  public async create(transactionInputDto: TransactionInputDto): Promise<ApiResponseDto<TransactionSimpleDto>> {
    return this.authorizedRequest(new ApiRequestDto("/", "POST", transactionInputDto))
  }

  public async approve(transactionId: number): Promise<ApiResponseDto<TransactionSimpleDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/approve/${transactionId}`, "PATCH", null))
  }

  public async cancel(transactionId: number): Promise<ApiResponseDto<TransactionSimpleDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/cancel/${transactionId}`, "PATCH", null))
  }

  public async changeStatus(transactionId: number, statusId: number): Promise<ApiResponseDto<TransactionSimpleDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${transactionId}/${statusId}`, "PATCH"))
  }
}