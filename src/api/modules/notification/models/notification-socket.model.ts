import WsResolverUtil from "@/utils/ws/ws-resolver.util";

export default class NotificationSocketModel extends WsResolverUtil {
  public setNewNotificationCallback(callback: Function) {
    this.subscribe("new-notification", callback)
  }
}