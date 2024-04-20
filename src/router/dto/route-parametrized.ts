import LoggerUtil from "@/utils/logger/logger.util";

export default class RouteParametrized {
  constructor(
    public name: string,
    public props: any | null = null,
  ) {}
  public toVueRoute(nestedValues) {
    let params = {};

    if (this.props) {
      Object.keys(this.props).forEach((prop) => {
        const val = this.props[prop];
        LoggerUtil.debug(this.props);
        LoggerUtil.debug(val);
        if (val == "nested") {
          params = {
            ...params,
            [prop]: nestedValues[prop],
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
      name: this.name,
      params,
    };
  }
}
