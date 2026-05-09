export interface FastAPIValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface FastAPIErrorResponse {
  detail?: string | FastAPIValidationError[];
  message?: string;
  error?: string;
}
