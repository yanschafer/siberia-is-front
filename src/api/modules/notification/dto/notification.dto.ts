import NotificationTypeDto from "@/api/modules/notification/dto/notification-type.dto";
import NotificationDomainDto from "@/api/modules/notification/dto/notification-domain.dto";

export default class NotificationDto {
  constructor(
    public id: number,
    public watched: boolean,
    public type: NotificationTypeDto,
    public domain: NotificationDomainDto,
    public description: string
  ) {
  }
}