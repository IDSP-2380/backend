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

router.get("/get-all-users", requireAuth(), async (req: Request, res: Response) => {
  
  const users = await clerkClient.users.getUserList()

  res.json({
    message: "You are authenticated!",
    fakeData: "random data",
    users: users,
  });
});

export default router as Router;
