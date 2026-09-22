import HttpError from "./http.error";

class GatewayTimeoutError extends HttpError {
  constructor(message: string) {
    super(504, message);
  }
}

export default GatewayTimeoutError;
