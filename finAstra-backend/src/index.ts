import { Hono } from "hono";
import userRouter from "./routes/user";
import chatRouter from "./routes/chat";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { cors } from "hono/cors";

type bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  OPENAI_API_KEY: string;
};

const app = new Hono<{
  Bindings: bindings;
  Variables: {
    prisma: PrismaClient;
  };
}>();

// app.use("*" , async (c,next) => {

//   const prisma = new PrismaClient({
//     datasourceUrl : c.env.DATABASE_URL
//   }).$extends(withAccelerate()) ;

//   c.set("prisma" , prisma) ;
//   await next() ;
// })

app.use(
  "/*",
  cors({
    origin: "https://finastra.onrender.com",
    credentials: true,
  }),
);

app.route("/api/v1/user", userRouter);
app.route("/api/v1/chat", chatRouter);

export default app;
