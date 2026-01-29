import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "@/src/lib/auth/auth";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);
router.get("/me", async (req, res) => {
    // Better Auth helper to extract the session from headers
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.json(session.user);
});

export default router;
