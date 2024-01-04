import WebSocketRequestDto from "@/api/utils/ws/dto/web-socket-request.dto";
import TokenUtil from "@/api/utils/token.util";
import WebSocketRequestHeadersDto from "@/api/utils/ws/dto/web-socket-request-headers.dto";
import ApiModelUtil from "@/api/utils/api-model.util";
import {serverConf} from "@/api/conf/server.conf";
import WebSocketEventDto from "@/api/utils/ws/dto/web-socket-event.dto";

export default class WsResolverUtil {
  private socket: WebSocket | null
  private isActive: boolean
  private whileInactive: WebSocketRequestDto[] = []

  handlers: Record<string, Function[]> = {
    "*": [(event: WebSocketEventDto<any>) => { console.log(`New event from socket (type=${event.type}):`, event.data) }]
  }

  async init() {
    this.isActive = false
    new Promise(resolve => {
      if (this.socket)
        resolve()

      else {
        this.socket = new WebSocket(serverConf.wsEndpoint)

        this.socket.onopen = () => {
          resolve(true)
        }

        this.socket.onmessage = (event: MessageEvent) => {
          const eventObj = JSON.parse(event.data)
          const eventHandlers = this.handlers[eventObj.type]
          let handlers = this.handlers["*"]
          if (eventHandlers)
            handlers = handlers.concat(eventHandlers)
          handlers.forEach(handler => {
            handler(eventObj)
          })
        }

        this.socket.onclose = async () => {
          //Firstly refresh tokens
          const apiModelUtil = new ApiModelUtil("");
          await apiModelUtil.refresh()
          await this.init()
        }
      }
    }).then(async () => {
      this.send("connect", {}).then(() => {
        this.isActive = true
        this.whileInactive.map(el => {
          this.sendRequest(el)
        })
      })
    })
  }

  private sendRequest(request: WebSocketRequestDto) {
    if (!this.isActive) {
      this.whileInactive.push(request)
      return;
    }

    request.body = JSON.stringify(request.body)
    if (this.socket && this.isActive)
      this.socket.send(JSON.stringify(request))
    else
      console.log("Sending failed due to socket close")
  }

  public async send(uri: string, data: any) {
    //Firstly refresh tokens
    const apiModelUtil = new ApiModelUtil("");
    await apiModelUtil.refresh()
    const token = TokenUtil.getAccess()
    if (token == null)
    this.sendRequest(new WebSocketRequestDto(
      new WebSocketRequestHeadersDto(
        token ? token : "",
        uri
      ),
      JSON.stringify(data)
    ))
  }

  protected subscribe(type: string, callback: Function) {
    if (this.handlers[type])
      this.handlers[type].push(callback)
    else
      this.handlers[type] = [callback]
  }
}