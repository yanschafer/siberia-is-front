export const serverConf = {
  proto: "",
  endpoint: "",
  refreshEndpoint: "",
  transferInProgressStatus: 0,
  wsEndpoint: "",
  loggerMode: "",
  loggerExcludedPrefixes: [],
  rules: {
   //Key-Value
  }
}

export enum TransactionType {
  INCOME = 1,
  OUTCOME,
  TRANSFER
}