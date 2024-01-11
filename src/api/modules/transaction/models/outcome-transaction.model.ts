import TransactionModel from "@/api/modules/transaction/models/transaction.model";

export default class OutcomeTransactionModel extends TransactionModel {
  constructor() {
    super("/outcome");
  }
}