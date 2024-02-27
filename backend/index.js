import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
dotenv.config();
const app = express();
app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );
app.use(morgan("common"));
const api_key = process.env.API_KEY;

//loading
const loader = new PDFLoader("./files/rbi_guidelines.pdf");
const docs = await loader.load();

//split into chunks : indexing
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
const split_docs = await textSplitter.splitDocuments(docs);

//vector store
const vectorStore = await MemoryVectorStore.fromDocuments(
  split_docs,
  new OpenAIEmbeddings(),
);

//retriever query->embed : search(store)
const retriever = vectorStore.asRetriever({ k: 6, searchType: "similarity" });

//llm
const llm = new ChatOpenAI({ temperature: 0.9, modelName: "gpt-3.5-turbo" });

//prompt engineering  (lol)
const template = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.
Always say "thanks for asking!" at the end of the answer.

{context}

Question: {question}

Helpful Answer:`;

const rag_prompt = PromptTemplate.fromTemplate(template);
const rag_chain = await createStuffDocumentsChain({
  llm,
  prompt: rag_prompt,
  outputParser: new StringOutputParser(),
});

app.post("/question", async (req, res) => {
  try {
    const { question } = req.body;
    console.log(question);
    //context create
    const context = await retriever.getRelevantDocuments(question);

    const messages = await rag_chain.invoke({
      context,
      question,
    });

    res.status(200).json({ llm: messages });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, () => {
  console.log(`running on port ${8080}`);
});
