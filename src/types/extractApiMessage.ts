import type { FastAPIErrorResponse } from "./api-error";

export function extractApiMessage(data: unknown): string {
  if (!data || typeof data !== 'object') {
    return 'Error del servidor';
  }

  const error = data as FastAPIErrorResponse;

  // ✅ detail string
  if (typeof error.detail === 'string') {
    return error.detail;
  }

  // ✅ errores de validación (422)
  if (Array.isArray(error.detail)) {
    return error.detail.map((e) => e.msg).join(', ');
  }

  // ✅ otros formatos posibles
  if (typeof error.message === 'string') {
    return error.message;
  }

  if (typeof error.error === 'string') {
    return error.error;
  }

  return 'Error del servidor';
}
