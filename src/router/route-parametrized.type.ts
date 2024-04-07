export default class RouteParametrized {
  constructor(
    public name: string,
    public props: any | null = null,
  ) {}
  public toVueRoute() {
    let params = {};

    if (this.props) {
      Object.keys(this.props).forEach((prop) => {
        const val = this.props[prop];
        if (val == "nested") {
          params = {
            ...params,
            [prop]: this.props[prop],
          };
        } else {
          params = {
            ...params,
            [prop]: val,
          };
        }
      });
    }

    return {
      path: this.name,
      params,
    };
  }
}
