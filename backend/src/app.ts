import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

export const app = express();

app.use(helmet());
app.use(cors());
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);