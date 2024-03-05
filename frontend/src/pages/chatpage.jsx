import { Link } from "react-router-dom";
import { MessageBox } from "../components/messagebox";
import { useState } from "react";
import { Conversations } from "../components/coversations";
import { BookOpen, ListPlus } from "lucide-react";
import { Navbar } from "../components/navbar";

export const ChatPage = () => {
  const [openConversation, setOpenConversation] = useState(false);
  return (
    <div className="min-w-screen  relative min-h-screen">
      <Navbar
        type={"chat"}
        openConversation={openConversation}
        setOpenConversation={setOpenConversation}
      />

      {openConversation && <Conversations />}
      <MessageBox />
    </div>
  );
};
