export default class WebSocketRequestHeadersDto {
  constructor(
    public authorization: string,
    public uri: string
  ) {
  }
}