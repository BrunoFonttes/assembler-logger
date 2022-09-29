import { TransportInterface } from '../interfaces'

export abstract class Transport<T> implements TransportInterface<T> {
  private silent: boolean

  private options: T

  constructor(props: { silent?: boolean; options: T }) {
    this.silent = props.silent || false
    this.options = props.options
  }

  protected abstract get online(): boolean
  getOptions(online: boolean): T | undefined {
    const result = this.silent || (!online && this.online) ? undefined : this.options

    return result
  }
}
