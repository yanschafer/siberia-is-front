type RouteParametrized = {
  name: string;
  props: any;
};

export default class BreadcrumbDto {
  constructor(
    public label: string,
    public route: string | null = null,
    public routeParametrized: RouteParametrized | null = null,
  ) {}
}
