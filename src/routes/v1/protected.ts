import { Router } from "express";
import { authMiddleware } from "@/src/middleware/auth";

const protectedRoutes = Router();


protectedRoutes.use("/", authMiddleware);
/**
 * Add protected Routes here
 */
protectedRoutes.get("/protected/me", async (req, res) => {
export default protectedRoutes;
