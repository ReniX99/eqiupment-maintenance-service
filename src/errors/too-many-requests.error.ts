import HttpError from "./http.error";

class TooManyRequestsError extends HttpError {
  constructor() {
    super(429, "Too many requests");
  }
}

export default TooManyRequestsError;
