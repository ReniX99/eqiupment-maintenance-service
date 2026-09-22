import HttpError from "./http.error";

class InternalServerError extends HttpError {
  constructor(message: string) {
    super(500, message);
  }
}

export default InternalServerError;
