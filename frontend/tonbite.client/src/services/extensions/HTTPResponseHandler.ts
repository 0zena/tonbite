import axios from "axios";

export class HTTPResponseHandler {
    /**
     * Gets error message from HTTP response error
     * @param {unknown} error - any HTTP response error;
     * @returns {string} User-friendly HTTP error message
     */
    public static HandleError(error: unknown): string {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data || "An error occurred";
        }

        return "An unknown error occurred";
    }
}
