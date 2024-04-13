export default class HistoryRowDto {
  constructor(
    public id: number,
    public author: string,
    public eventTypeId: number,
    public eventType: string,
    public eventObjectType: string,
    public eventObjectTypeId: number,
    public eventObjectName: string,
    public eventDescription: string,
    public timestamp: string,
  ) {}
}
