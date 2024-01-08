export default class WebSocketEventDto <T> {
  constructor(
    public type: string,
    public data: T
  ) {
  }
}