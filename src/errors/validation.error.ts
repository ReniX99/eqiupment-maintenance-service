import HttpError from "./http.error";

class ValidationError extends HttpError {
  constructor(message: string, details: any) {
    super(400, message, details);
  }
}

export default ValidationError;
