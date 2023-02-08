import { FileLoader, Loader, LoadingManager } from 'three'
import { ABrainVisBundle } from './bundle'

export class ABrainVisLoader extends Loader {
  constructor(manager?: LoadingManager) {
    super(manager)
  }

  load(
    url: string,
    onLoad: (bundle: ABrainVisBundle) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): void {

    const loader = new FileLoader(this.manager)
    loader.setPath(this.path)
    loader.setRequestHeader(this.requestHeader)
    loader.setWithCredentials(this.withCredentials)
    loader.setResponseType("text")

    loader.load(url, attributes => {

      if (typeof attributes !== "string")
        throw new Error("Unexpected type from FileLoader")

      loader.setResponseType("arraybuffer")
      loader.load(url + "data", data => {

        if (!(data instanceof ArrayBuffer))
          throw new Error("Unexpected type from FileLoader")

        onLoad(new ABrainVisBundle(attributes, data))

      }, onProgress, onError)

    }, onProgress, onError)
  }

  loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<ABrainVisBundle> {
    return new Promise((res, rej) => {
      this.load(url, res, onProgress, rej)
    })
  }
}
