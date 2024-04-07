import RouteParametrized from "@/router/route-parametrized.type";

export default class HeaderBtnDto {
  constructor(
    public label: string,
    public route: RouteParametrized | null = null,
    public callback: Function | null = null,
  ) {}
}
