import { useState } from "react";
import { Message } from "./message";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue } from "recoil";
import { chatAtom, messageAtom } from "../store/atoms";
import { InputBar } from "./inputbar";
import { BounceLoader, PropagateLoader } from "react-spinners";

export const MessageBox = () => {
  const [humanMessage, setHumanMessage] = useState("");
  const [messages, setMessages] = useRecoilState(messageAtom);
  const boxRef = useRef();
  const [loading, setLoading] = useState(false);
  const chatId = useRecoilValue(chatAtom);

  useEffect(() => {
    const getChatMessages = async () => {
      try {
        const { data } = await axios.get(`/chat/messages?chatId=${chatId}`);
        // await new Promise((res) => setTimeout(() => res(), 3000));
        if (data.message) {
          setMessages(data.message);
          //an array
        }
      } catch (e) {
        console.log(e);

        setMessages([]);
      }
    };
    getChatMessages();
  }, [chatId, setMessages]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);
  //scroll to bottom function
  const scrollToBottom = () => {
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  };

  const handleSendQuestion = async () => {
    setMessages([...messages, { content: humanMessage, type: "Human" }]),
      setHumanMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(`/chat/question/${chatId}`, {
        question: humanMessage,
      });
      if (data.message) {
        //handle update message
        setMessages((prev) => [...prev, { content: data.message, type: "AI" }]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={boxRef}
      className="relative mx-0 flex max-h-screen w-full flex-col gap-0 overflow-y-scroll py-24     sm:mx-auto  sm:w-3/5 "
    >
      {messages?.map((msg, i) => (
        <Message key={i} type={msg.type} message={msg.content} />
      ))}
      {loading && (
        <div className="flex w-full items-center justify-start gap-3 py-2 ps-5">
          <BounceLoader size={25} color="#0085ff" />
          <h1 className="text-base text-gray-500 ">Typing...</h1>
        </div>
      )}

      <InputBar
        humanMessage={humanMessage}
        setHumanMessage={setHumanMessage}
        handleSendQuestion={handleSendQuestion}
      />
    </div>
  );
};
