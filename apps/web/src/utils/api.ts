import { ApiError } from '@/types/api';

export const safeAsync = async <T>(fn: () => Promise<T>) => {
  try {
    const data = await fn();
    return { data, error: undefined };
  } catch (error) {
    const err = error as ApiError;
    return { data: undefined, error: err };
  }
};