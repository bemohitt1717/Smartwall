import express from "express";
import indexRoute from "./routes/index.routes.js"
import cors from "cors";
import morgan from "morgan";

const app = express();


app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials:true
}))

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", indexRoute);

app.get("/", indexRoute);

export default app;