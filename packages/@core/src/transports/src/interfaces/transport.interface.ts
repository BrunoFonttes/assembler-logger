export interface TransportInterface<T> {
  getOptions(online: boolean): T | undefined
}
