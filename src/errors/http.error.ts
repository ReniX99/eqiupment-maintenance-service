class HttpError extends Error {
  statusCode: number;
  message: string;
  details: any;

  constructor(statusCode: number, message: string, details = null) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}

export default HttpError;
