import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "@/src/lib/auth/auth";
 import { toNodeHandler } from "better-auth/node";
const router = Router();

 
router.all('/{*any}', toNodeHandler(auth));

export default router;