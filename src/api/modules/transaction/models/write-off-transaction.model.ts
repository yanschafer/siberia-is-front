import TransactionModel from "@/api/modules/transaction/models/transaction.model";
import ApiResponseDto from "@/api/dto/api-response.dto";
import TransactionSimpleDto from "@/api/modules/transaction/dto/transaction-simple.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import { appConf } from "@/api/conf/app.conf";

export default class WriteOffTransactionModel extends TransactionModel {
  constructor() {
    super("/write-off");
  }
}
