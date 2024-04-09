import { useState } from "react";
import { Message } from "./message";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { chatAtom, messageAtom, referencesAtom } from "../store/atoms";
import { InputBar } from "./inputbar";
import { BounceLoader } from "react-spinners";
import { Lightbulb, ArrowUpLeft, ArrowUpRight } from "lucide-react";

export const MessageBox = () => {
  const [humanMessage, setHumanMessage] = useState("");
  const [messages, setMessages] = useRecoilState(messageAtom);
  const setReferences = useSetRecoilState(referencesAtom);
  const boxRef = useRef();
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState({
    message: " An error occured, Retry!",
    state: false,
  });
  const [chatId, setChatId] = useRecoilState(chatAtom);

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
      const { data } = await axios.post(
        `/chat/question/${chatId ? chatId : "new"}`,
        {
          question: humanMessage,
        },
      );
      if (data.newChat) {
        console.log("new chat created and set to current ");
        setChatId(data.newChat);
      }
      if (data.message) {
        //handle update message
        setMessages((prev) => [
          ...prev,
          { content: data.message.text, type: "AI" },
        ]);
        setReferences(data.message.sourceDocuments);
      } else {
        throw Error(data.error);
      }
    } catch (e) {
      setShowError({ message: e.message, state: true });
      setTimeout(
        () =>
          setShowError({ message: " An error occured, Retry!", state: false }),
        2000,
      );
      setMessages([...messages]);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={boxRef}
      className="relative mx-0 flex h-[100vh] w-full flex-col gap-0 overflow-y-scroll py-24   sm:mx-auto  sm:w-3/5 "
    >
      {!messages.length && (
        <div className="w-full h-full center-div text-gray-500 font-light text-sm sm:text-lg">
          <div className="w-4/5 sm:w-3/5">
            <div className=" border border-gray-400 center-div my-2 justify-between rounded-md px-4 py-4  ">
              <span className="center-div">
                <ArrowUpLeft className="inline me-2" />
                Conversations
              </span>
              <span className="center-div">
                Sources
                <ArrowUpRight className="inline ms-2" />
              </span>
            </div>
            <div className=" border border-gray-400 center-div my-2 rounded-md px-4 py-4 gap-4 ">
              <Lightbulb className="inline" />
              <span>Try asking about RBI guidelines.</span>
            </div>
            <div className=" border border-gray-400 center-div my-2 rounded-md px-4 py-4 gap-4 ">
              <Lightbulb className="inline" />
              <span>You have 10 trial credits.</span>
            </div>
          </div>
        </div>
      )}
      {messages?.map((msg, i) => (
        <Message key={i} type={msg.type} message={msg.content} />
      ))}
      {loading && (
        <div className="flex w-full items-center justify-start gap-3 py-2 ps-5">
          <BounceLoader size={25} color="#0085ff" />
          <h1 className="text-base text-gray-500 ">Typing...</h1>
        </div>
      )}
      {showError.state && (
        <div className="center-div w-full bg-red-100 py-3 font-normal text-red-800">
          {showError.message}
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
