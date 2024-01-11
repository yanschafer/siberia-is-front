import TransactionModel from "@/api/modules/transaction/models/transaction.model";
import ApiResponseDto from "@/api/dto/api-response.dto";
import TransactionSimpleDto from "@/api/modules/transaction/dto/transaction-simple.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import {appConf} from "@/api/conf/app.conf";

export default class TransferTransactionModel extends TransactionModel {
  constructor() {
    super("/transfer");
  }

  override async approve(transactionId: number): Promise<ApiResponseDto<TransactionSimpleDto>> {
    throw new DOMException("Not implemented")
  }

  override async cancel(transactionId: number): Promise<ApiResponseDto<TransactionSimpleDto>> {
    throw new DOMException("Not implemented")
  }

  public async startProcessing(transactionId: number, fromStockId: number): Promise<ApiResponseDto<TransactionSimpleDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${transactionId}/${appConf.transferInProgressStatus}/${fromStockId}`, "PATCH"))
  }

  public async solveNotDeliveredProblem(transactionId: number, statusOnSolve: number): Promise<ApiResponseDto<TransactionSimpleDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${transactionId}/solve/${statusOnSolve}`, "PATCH"))
  }
}