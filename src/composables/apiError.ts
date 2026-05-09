export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);

    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);

    if (status !== undefined) this.status = status;
    if (data !== undefined) this.data = data;
  }
}
