import axios, { isAxiosError } from "axios";
import logger from "@/lib/logger";

const httpClient = axios.create();

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const url = error.config?.baseURL
        ? error.config.baseURL + error.config.url
        : error.config?.url;

      logger.error(`HTTP Error on ${url}`, {
        message: error.message,
        url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

export default httpClient;
