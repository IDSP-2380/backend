import { Router, Request, Response } from "express";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";

const router = Router();

router.get("/test", requireAuth(), async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const user = await clerkClient.users.getUser(userId);

  res.json({
    message: "You are authenticated!",
    fakeData: "random data",
    userId: user,
  });
});

export default router as Router;
