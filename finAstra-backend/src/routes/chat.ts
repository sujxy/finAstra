import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
//langchian
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { rag_prompt } from "../prompts/index";

import { verify } from "hono/utils/jwt/jwt";

const chatRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    OPENAI_API_KEY: string;
  };
  Variables: {
    prisma: PrismaClient;
    userId: string;
    credits: number;
  };
}>();

chatRouter.use("/*", async (c, next) => {
  const tokenHeader = c.req.header("Authorization");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  if (!tokenHeader) {
    c.status(411);
    return c.json({ error: "authorization error !" });
  }
  const token = tokenHeader?.split(" ")[1];
  if (!token) {
    c.status(403);
    return c.json({ error: "token is invalid/expired. Login!" });
  }
  const tokenData = await verify(token, c.env.JWT_SECRET);

  if (!tokenData) {
    c.status(401);
    return c.json({ error: "invalid token !" });
  }
  const user = await prisma.user.findUnique({
    where: { userId: tokenData.userId },
  });
  c.set("userId", tokenData.userId);
  c.set("credits", user?.credits || 0);
  await next();
});

chatRouter.post("/new", async (c) => {
  try {
    //create prisma client
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userId");
    const body = await c.req.json();
    const newChat = await prisma.chat.create({
      data: {
        userId: userId,
        title: body.title,
      },
    });
    c.status(200);
    return c.json({
      message: {
        chat: newChat,
      },
    });
  } catch (e: any) {
    c.status(500);
    return c.json({ error: e.message });
  }
});

chatRouter.delete("/delete", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const chatId = c.req.query("chatId");

    await prisma.message.deleteMany({
      where: {
        chatId: chatId,
      },
    });

    await prisma.chat.delete({
      where: { chatId },
    });

    const chats = await prisma.chat.findMany();

    c.status(200);
    return c.json({ message: chats });
  } catch (e: any) {
    c.status(500);
    return c.json({ error: e.message });
  }
});

chatRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const chats = await prisma.chat.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  c.status(200);
  return c.json({ message: chats });
});

chatRouter.get("/messages", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const chatId = c.req.query("chatId");

    const messages = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    c.status(200);
    return c.json({ message: messages });
  } catch (e: any) {
    c.status(500);
    return c.json({ error: e.message });
  }
});

chatRouter.post("/question/:chatId", async (c) => {
  try {
    const userId = c.get("userId");
    const credits = c.get("credits");
    console.log(credits);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const chatId = c.req.param("chatId");

    const loader = new CheerioWebBaseLoader(
      "https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12562&Mode=0#mainsection",
    );
    const docs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const split_docs = await textSplitter.splitDocuments(docs);
    const store = await MemoryVectorStore.fromDocuments(
      split_docs,
      new OpenAIEmbeddings({ openAIApiKey: c.env.OPENAI_API_KEY }),
    );
    const retriever = store.asRetriever();
    const model = new OpenAI({ openAIApiKey: c.env.OPENAI_API_KEY });
    const chain = new RetrievalQAChain({
      combineDocumentsChain: loadQAStuffChain(model, { prompt: rag_prompt }),
      retriever: retriever,
      returnSourceDocuments: true,
    });
    //check credits
    if (credits <= 0)
      return c.json({ error: "Your credits have expired ,only 10 per user!" });
    //context create
    const res = await chain.call({
      query: body.question,
    });
    userId != "a238c7bb-fc3b-4dbd-8995-7ab4a23bbf3f" &&
      (await prisma.user.update({
        where: {
          userId: userId,
        },
        data: {
          credits: { decrement: 1 },
        },
      })); //we are decrementing credits except one user for testing purpose ! very naive approach
    const userMessage = await prisma.message.create({
      data: {
        content: body.question,
        chatId: chatId,
        type: "Human",
      },
    });
    const llmMessage = await prisma.message.create({
      data: {
        content: res.text,
        chatId: chatId,
        type: "AI",
      },
    });

    c.status(200);
    return c.json({ message: res });
  } catch (e: any) {
    c.status(500);
    return c.json({ error: e.message });
  }
});

export default chatRouter;
