import dotenv from "dotenv";
import { Request, Response, Router } from "express";

import { InfisicalBaseApi } from "../../base";
import { EncryptionAlgorithm } from "../../constants/enum";

dotenv.config();

export const router = Router();
const baseApi = new InfisicalBaseApi();
const api = baseApi.api;
const { INFISICAL_KMS_PROJECT_ID, SECRETFY_KEY_ID } = process.env;

router.post("/kms/keys", async (req: Request, res: Response) => {
  const { keyName } = req.body;
  const data = JSON.stringify({
    projectId: INFISICAL_KMS_PROJECT_ID,
    name: keyName,
    encryptionAlgorithm: EncryptionAlgorithm.AES_GCM_256,
  });

  try {
    const response = await api.post(`/kms/keys`, data);
    res.send({ data: response.data, status: 200 });
  } catch (error) {
    res.send({ error, status: 500 });
  }
});

router.post(`/kms/keys/encrypt`, async (req: Request, res: Response) => {
  const values = {
    name: "Jhon Doe",
    email: "email@email.com",
    password: "",
  };
  const plaintext = Buffer.from(JSON.stringify(values), "utf-8").toString(
    "base64"
  );
  const data = JSON.stringify({
    plaintext,
  });

  try {
    const response = await api.post(
      `/kms/keys/${SECRETFY_KEY_ID}/encrypt`,
      data
    );
    res.send({ data: response.data, status: 200 });
  } catch (error) {
    res.send({ error, status: 500 });
  }
});

router.post(`/kms/keys/decrypt`, async (req: Request, res: Response) => {
  const { ciphertext } = req.body;
  const data = {
    ciphertext,
  };

  try {
    const response = await api.post(
      `/kms/keys/${SECRETFY_KEY_ID}/decrypt`,
      data
    );
    const jsonString = Buffer.from(response?.data?.plaintext, "base64").toString("utf-8");
    const originalObject = JSON.parse(jsonString);
    res.send({ data: originalObject, status: 200 });
  } catch (error) {
    res.send({ error, status: 500 });
  }
});
