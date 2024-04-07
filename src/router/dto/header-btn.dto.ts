import RouteParametrized from "@/router/dto/route-parametrized";

export default class HeaderBtnDto {
  constructor(
    public label: string,
    public route: RouteParametrized | null = null,
    public callback: Function | null = null,
  ) {}
}
