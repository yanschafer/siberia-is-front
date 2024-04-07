import RouteParametrized from "@/router/dto/route-parametrized";

export default class BreadcrumbDto {
  constructor(
    public label: string,
    public route: RouteParametrized,
  ) {}
}
