import WsResolverUtil from "@/utils/ws/ws-resolver.util";

class NotificationSocketModel extends WsResolverUtil {
  public setNewNotificationCallback(callback: Function) {
    this.subscribe("new-notification", callback);
  }
  public setNewRulesUpdateCallback(callback: Function) {
    this.subscribe("update-rules", callback);
  }
}

export default new NotificationSocketModel();
