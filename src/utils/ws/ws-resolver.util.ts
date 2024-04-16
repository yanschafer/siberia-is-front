import WebSocketRequestDto from "@/utils/ws/dto/web-socket-request.dto";
import WebSocketEventDto from "@/utils/ws/dto/web-socket-event.dto";
import { appConf } from "@/api/conf/app.conf";
import ApiModelUtil from "@/utils/api-model.util";
import TokenUtil from "@/utils/token.util";
import WebSocketRequestHeadersDto from "@/utils/ws/dto/web-socket-request-headers.dto";
import loggerUtil from "@/utils/logger/logger.util";
import LoggerUtil from "@/utils/logger/logger.util";

export const WsHandlers: Record<string, Function[]> = {
  "*": [
    (event: WebSocketEventDto<any>) => {
      loggerUtil.debugPrefixed(
        "WebSocket",
        `New event from socket (type=${event.type}):`,
        event.data,
      );
    },
  ],
};

export default class WsResolverUtil {
  private socket: WebSocket | null;
  private isActive: boolean;
  private whileInactive: WebSocketRequestDto[] = [];
  private reconnectAttempts = 0;

  public close() {
    if (this.socket) this.socket?.close(3488);
    this.socket = null;
  }

  public async init() {
    this.isActive = false;
    new Promise((resolve) => {
      if (this.socket) {
        resolve();
      } else {
        this.socket = new WebSocket(appConf.wsEndpoint);

        this.socket.onopen = () => {
          resolve(true);
        };

        this.socket.onmessage = (event: MessageEvent) => {
          const eventObj = JSON.parse(event.data);
          LoggerUtil.debug(eventObj, event.data);
          const eventHandlers = WsHandlers[eventObj.type];
          let handlers = WsHandlers["*"];
          LoggerUtil.debug(handlers, WsHandlers);
          if (eventHandlers) handlers = handlers.concat(eventHandlers);
          handlers.forEach((handler) => {
            handler(eventObj);
          });
        };

        this.socket.onclose = async (event) => {
          if (event.code == 3488) return;
          loggerUtil.debugPrefixed("WebSocket", "Websocket closed", event);
          if (TokenUtil.isAuthorized()) {
            this.socket = null;
            //Firstly, refresh tokens
            const apiModelUtil = new ApiModelUtil("");
            const res = await apiModelUtil.refresh();
            if (res.success) this.init();
          }
        };

        this.socket.onerror = (error) => {
          loggerUtil.debugPrefixed("WebSocket", "Websocket error", error);
        };
      }
    }).then(async () => {
      loggerUtil.debugPrefixed(
        "WebSocket",
        "STARTED",
        this.socket,
        this.whileInactive,
      );
      this.send("connect", {}).then(() => {
        this.reconnectAttempts = 0;
        this.isActive = true;
        this.whileInactive.map((el) => {
          this.sendRequest(el);
        });
        this.whileInactive = [];
      });
    });
  }

  private sendRequest(request: WebSocketRequestDto) {
    loggerUtil.debugPrefixed("WebSocket", "Websocket send request", request);
    if (!this.isActive) {
      loggerUtil.debugPrefixed("WebSocket", "Put on hold");
      this.whileInactive.push(request);
      return;
    }

    request.body = JSON.stringify(request.body);
    if (this.socket && this.isActive) this.socket.send(JSON.stringify(request));
    else
      loggerUtil.debugPrefixed(
        "WebSocket",
        "Sending failed due to socket close",
      );
  }

  public async send(uri: string, data: any) {
    loggerUtil.debugPrefixed("WebSocket", "Try send", uri, data);
    //Firstly refresh tokens
    const apiModelUtil = new ApiModelUtil("");
    await apiModelUtil.refresh();
    const token = TokenUtil.getAccess();
    loggerUtil.debugPrefixed("Websocket", token);
    if (token != null)
      this.sendRequest(
        new WebSocketRequestDto(
          new WebSocketRequestHeadersDto(token ? token : "", uri),
          JSON.stringify(data),
        ),
      );
  }

  protected subscribe(type: string, callback: Function) {
    LoggerUtil.debug(type, callback);
    if (WsHandlers[type]) WsHandlers[type].push(callback);
    else WsHandlers[type] = [callback];

    LoggerUtil.debug("CURRENT HANDLERS", WsHandlers);
  }
}
