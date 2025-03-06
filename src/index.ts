import dotenv from "dotenv";
import express from "express";
import { router as healthCheckRoute } from "./routes/healthCheck";
import { router as kmsRoute } from "./routes/kms";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());

app.use("/api", [healthCheckRoute, kmsRoute]);

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "dev")
    console.log(
      `Server is running on http://localhost:${PORT}/api/health-check`
    );
});
