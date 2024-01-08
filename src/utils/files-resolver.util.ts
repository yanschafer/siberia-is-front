import {appConf} from "@/api/conf/app.conf";

class FilesResolverUtil {
  getStreamUrl(fileName: string): string {
    return `${appConf.proto}://${appConf.endpoint}file/stream/${fileName}`
  }
}

export default (new FilesResolverUtil())