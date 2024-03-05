import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

import { sign } from "hono/utils/jwt/jwt";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: PrismaClient;
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  //create prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        username: body.username,
      },
    });
    const token = await sign({ userId: user.userId }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up !" });
  }
});

userRouter.post("/signin", async (c) => {
  //create prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    c.status(404);
    return c.json({ error: "user not found" });
  }

  if (user?.password != body.password) {
    c.status(411);
    return c.json({ error: "invalid password" });
  }

  const token = await sign({ userId: user.userId }, c.env.JWT_SECRET);
  c.status(200);
  return c.json({ message: "login success !", token });
});

export default userRouter;
