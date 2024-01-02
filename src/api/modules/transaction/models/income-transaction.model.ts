import TransactionModel from "@/api/modules/transaction/models/transaction.model";

export default class IncomeTransactionModel extends TransactionModel {
  constructor() {
    super("income")
  }
}