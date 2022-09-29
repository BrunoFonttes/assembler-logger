export class AppError extends Error {
  public readonly code?: string;

  constructor(props: { name: string; message: string; code?: string }) {
    super(props.message);
    this.name = props.name;
    this.code = props.code;
  }

  get value() {
    return {
      message: this.message,
      exceptionName: this.name,
      code: this.code,
      stack: this.stack,
    };
  }
}
