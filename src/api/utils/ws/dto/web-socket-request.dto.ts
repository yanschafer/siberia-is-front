import WebSocketRequestHeadersDto from "@/api/utils/ws/dto/web-socket-request-headers.dto";

export default class WebSocketRequestDto {
  constructor(
    public headers: WebSocketRequestHeadersDto,
    public body: any
  ) {
  }
}