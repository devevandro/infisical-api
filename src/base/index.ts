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
        Authorization: `Bearer `,
      },
    });
  }
}
