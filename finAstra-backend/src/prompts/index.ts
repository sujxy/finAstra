import { PromptTemplate } from "@langchain/core/prompts";

const rag_prompt_template: string = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use four sentences maximum and keep the answer as concise as possible.
If user asks something irrelevant to the context ,apologize to them and tell (starting with: "try asking...") them a few things you can answer
from  the context provided below .
Always say "thanks for asking!" at the end of the answer.

{context}

Question: {question}

Helpful Answer:`;

export const rag_prompt = PromptTemplate.fromTemplate(rag_prompt_template);
