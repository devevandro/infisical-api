import axios, { AxiosInstance } from "axios";
import dotevn from "dotenv";
dotevn.config();

export class InfisicalBaseApi {
  public api: AxiosInstance;

  constructor() {
    const { INFISICAL_API_URL, INFISICAL_BEARER_TOKEN } = process.env;
    this.api = axios.create({
      baseURL: `${INFISICAL_API_URL}/v1`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eUlkIjoiYTMzNjExODgtZWQ3Zi00YmMxLTk3ZjUtZDNiODBlYjFkY2I3IiwiaWRlbnRpdHlBY2Nlc3NUb2tlbklkIjoiMDZkNDIyNGYtMDBmMC00MzBjLTliZjQtZjRhZmQ3ZjdhNzQ0IiwiYXV0aFRva2VuVHlwZSI6ImlkZW50aXR5QWNjZXNzVG9rZW4iLCJpYXQiOjE3NDEyMjA2MjgsImV4cCI6MTc0MzgxMjYyOH0.UmfJYczxzaa_YkyL6_phYK3Q7q9A8wlA7pp8UcfITDE`,
      },
    });
  }
}
