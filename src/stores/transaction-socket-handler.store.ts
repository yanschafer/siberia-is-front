import { defineStore } from "pinia";
import TransactionDto from "@/api/modules/transaction/dto/transaction.dto";

export const useTransactionSocketHandler = defineStore({
  id: "transaction-socket-handler",
  actions: {
    updateTransaction(
      transactionId: number,
      transactionOutputDto: TransactionDto,
    ) {},
  },
});
