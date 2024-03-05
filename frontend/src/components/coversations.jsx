import { useEffect } from "react";
import { chatAtom, chatSelector, userAtom } from "../store/atoms";
import {
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import axios from "axios";
import { useState } from "react";

const Chat = ({ chatId, title }) => {
  const [currentChat, setCurrentChat] = useRecoilState(chatAtom);

  return (
    <h1
      onClick={() => setCurrentChat(chatId)}
      className={`w-full truncate rounded-md px-2 py-1 text-left text-sm font-light ${currentChat == chatId ? "bg-gray-200 font-medium" : null} `}
    >
      {title}
    </h1>
  );
};

export const Conversations = () => {
  const userId = useRecoilValue(userAtom);
  const setChatId = useSetRecoilState(chatAtom);

  const [chats, setChats] = useRecoilStateLoadable(chatSelector);
  const [chatTitle, setChatTitle] = useState("");

  // useEffect(() => {
  //   const getUserChats = async () => {
  //     const { data } = await axios.get(`/chat/bulk`);
  //     if (data.message) {
  //       setChats(data.message);
  //     }
  //   };
  //   getUserChats();
  // }, [userId]);

  const createNewChat = async () => {
    if (chatTitle == "") return;
    const { data } = await axios.post(`/chat/new`, {
      userId: userId,
      title: chatTitle,
    });
    if (data.message) {
      const { chatId } = data.message.chat;
      setChatTitle("");
      setChats((prev) => [data.message.chat, ...prev]);
      setChatId(chatId);
    }
  };

  return (
    <div
      className="h-8/12 absolute left-0 top-20 z-20 flex  w-full  flex-col items-center
      gap-1  bg-white/30  p-1 px-2  backdrop-blur-lg  sm:w-1/5"
    >
      <div className="mb-2 flex w-full rounded-md border-2 px-1 py-1 ">
        <input
          type="text"
          value={chatTitle}
          onChange={(e) => setChatTitle(e.target.value)}
          placeholder="new chat title.."
          className="w-11/12 border-0 px-1 py-0 outline-none"
        />
        <button
          onClick={createNewChat}
          className="center-div w-1/12 rounded-md bg-black text-white"
        >
          <h1>+</h1>
        </button>{" "}
      </div>
      {chats.state == "hasValue" &&
        chats.contents?.map((chat, i) => (
          <Chat key={i} chatId={chat.chatId} title={chat.title} />
        ))}
      {chats.state == "loading" && "Loading..."}
    </div>
  );
};
