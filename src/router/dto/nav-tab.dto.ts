import RouteParametrized from "@/router/dto/route-parametrized";

export default class NavTabDto {
  constructor(
    public id: number,
    public label: string,
    public route: RouteParametrized | null = null,
    public callback: Function | null = null,
  ) {}
}
