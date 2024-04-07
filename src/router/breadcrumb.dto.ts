import RouteParametrized from "@/router/route-parametrized.type";

export default class BreadcrumbDto {
  constructor(
    public label: string,
    public route: RouteParametrized,
  ) {}
}
