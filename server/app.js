import express from "express";
import mongoose from "mongoose";
import indexRoute from "./routes/index.routes.js";
import cors from "cors";
import morgan from "morgan";

const app = express();


app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://smartwall.vercel.app',
            'https://smartwall-omnojmq9x-mohitt-projects.vercel.app'
        ];
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if origin starts with any allowed pattern (for Vercel preview URLs)
        const isAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed)) || 
                         origin.includes('smartwall') && origin.includes('vercel.app');
        
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))

app.use(morgan("dev"));

app.use(express.json());

app.get("/health/live", (req, res) => {
    res.status(200).json({ status: "alive" });
});

app.get("/health/ready", (req, res) => {
    const isDatabaseConnected = mongoose.connection.readyState === 1;

    res.status(isDatabaseConnected ? 200 : 503).json({
        status: isDatabaseConnected ? "ready" : "not_ready",
        database: isDatabaseConnected ? "connected" : "disconnected",
    });
});

app.use("/api", indexRoute);

app.get("/", indexRoute);

export default app;