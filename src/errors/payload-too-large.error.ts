import HttpError from "./http.error";

class PayloadTooLargeError extends HttpError {
  constructor() {
    super(413, "Request body is too large");
  }
}

export default PayloadTooLargeError;
