import WebSocketRequestDto from "@/utils/ws/dto/web-socket-request.dto";
import WebSocketEventDto from "@/utils/ws/dto/web-socket-event.dto";
import { appConf } from "@/api/conf/app.conf";
import ApiModelUtil from "@/utils/api-model.util";
import TokenUtil from "@/utils/token.util";
import WebSocketRequestHeadersDto from "@/utils/ws/dto/web-socket-request-headers.dto";
import loggerUtil from "@/utils/logger/logger.util";

export default class WsResolverUtil {
  private socket: WebSocket | null;
  private isActive: boolean;
  private whileInactive: WebSocketRequestDto[] = [];
  private reconnectAttempts = 0;

  handlers: Record<string, Function[]> = {
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

  public close() {
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
          const eventHandlers = this.handlers[eventObj.type];
          let handlers = this.handlers["*"];
          if (eventHandlers) handlers = handlers.concat(eventHandlers);
          handlers.forEach((handler) => {
            handler(eventObj);
          });
        };

        this.socket.onclose = async (event) => {
          loggerUtil.debugPrefixed("WebSocket", "Websocket closed", event);
          if (TokenUtil.isAuthorized()) {
            this.socket = null;
            //Firstly, refresh tokens
            // const apiModelUtil = new ApiModelUtil("");
            // await apiModelUtil.refresh();
            // setTimeout(async () => {
            //   await this.init();
            // }, 200);
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
    if (this.handlers[type]) this.handlers[type].push(callback);
    else this.handlers[type] = [callback];
  }
}
