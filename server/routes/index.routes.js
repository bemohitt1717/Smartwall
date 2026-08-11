import { Router } from "express";
import userRouter from "./user.routes.js";
import projectRouter from "./project.routes.js"

 const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success : true,
        message : "smartwall API is running"
    });
});


router.use("/user", userRouter);
router.use("/project", projectRouter);
export default router;