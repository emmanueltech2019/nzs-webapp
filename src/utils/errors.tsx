import axios from "@/utils/axios";

export const handleApiError = (err: unknown, defaultMessage: string = "An unexpected error occurred") => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || defaultMessage;
    }
    return defaultMessage;
  };
  