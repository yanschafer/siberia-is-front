import WsResolverUtil from "@/utils/ws/ws-resolver.util";

class TransactionSocketModel extends WsResolverUtil {
  public setTransactionUpdateCallback(callback: Function) {
    this.subscribe("update-transaction", callback);
  }
}

export default new TransactionSocketModel();
