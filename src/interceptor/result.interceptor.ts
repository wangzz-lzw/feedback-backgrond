class Result<T> {
  code: number;
  data: T;
  message: string;
  constructor(code: number, data: T, message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }
  static success<T>(data: T, message = 'success') {
    return new Result<T>(200, data, message);
  }
  static fail<T>(message = 'fail') {
    return new Result<T>(500, null, message);
  }
}

export default Result;
