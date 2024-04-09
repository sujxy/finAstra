import { useEffect } from "react";
import { chatAtom, userAtom } from "../store/atoms";
import { Trash2, Frown } from "lucide-react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { useState } from "react";
import { ChatSkeleton } from "../assets/chatSkeleton";

const Chat = ({ chatId, title, setChats }) => {
  const [currentChat, setCurrentChat] = useRecoilState(chatAtom);
  const [active, setActive] = useState(false);

  const handleDelete = async () => {
    const { data } = await axios.delete(`/chat/delete?chatId=${chatId}`);
    if (data.message) {
      setChats(data.message);
      setCurrentChat("");
    }
  };

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`flex w-full items-center hover:border  justify-between truncate rounded-md px-2 py-1 text-left text-sm font-light ${currentChat == chatId ? "bg-gray-200 font-medium" : null} `}
    >
      <h1
        onClick={() => setCurrentChat(chatId)}
        className="truncate hover:cursor-pointer"
      >
        {title}
      </h1>
      {active && (
        <Trash2
          onClick={handleDelete}
          className="hover:text-red-500 hover:cursor-pointer"
          size={14}
        />
      )}
    </div>
  );
};

export const Conversations = () => {
  const userId = useRecoilValue(userAtom);
  const [chatId, setChatId] = useRecoilState(chatAtom);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatTitle, setChatTitle] = useState("");

  useEffect(() => {
    setLoading(true);
    const getUserChats = async () => {
      const { data } = await axios.get(`/chat/bulk`);
      if (data.message) {
        setChats(data.message);
        setLoading(false);
      }
    };
    getUserChats();
  }, [chatId]);

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
      className="h-[90vh] absolute overflow-y-scroll left-0 top-20 z-20 flex  w-full  flex-col items-center
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
      {chats?.map((chat, i) => (
        <Chat
          key={i}
          chatId={chat.chatId}
          title={chat.title}
          setChats={setChats}
        />
      ))}
      {loading && !chats.length && <ChatSkeleton count={5} />}
      {!loading && !chats.length && (
        <div className="w-full border border-gray-400 text-gray-500 p-2 rounded-md flex flex-col gap-1 justify-center items-center text-center">
          <Frown className="text-purple-600" />
          <span>Oops! No chats,try creating one.</span>
        </div>
      )}
    </div>
  );
};
