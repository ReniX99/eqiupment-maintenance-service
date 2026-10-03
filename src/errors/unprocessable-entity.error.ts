import HttpError from "./http.error";

class UnprocessableEntityError extends HttpError {
  constructor(message: string) {
    super(422, message);
  }
}

export default UnprocessableEntityError;
