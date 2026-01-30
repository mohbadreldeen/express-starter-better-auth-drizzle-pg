import { Router } from "express";
import { authMiddleware } from "@/src/middleware/auth";

const protectedRoutes = Router();


protectedRoutes.use("/", authMiddleware);
/**
 * Add protected Routes here
 */
 
export default protectedRoutes;
