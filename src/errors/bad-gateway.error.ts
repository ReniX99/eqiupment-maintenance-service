import HttpError from "./http.error";

class BadGatewayError extends HttpError {
  constructor(message: string) {
    super(502, message);
  }
}

export default BadGatewayError;
