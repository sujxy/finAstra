import { MessageBox } from "../components/messagebox";
import { useState } from "react";
import { Conversations } from "../components/coversations";

import { Navbar } from "../components/navbar";
import { References } from "../components/references";

export const ChatPage = () => {
  const [openConversation, setOpenConversation] = useState(false);
  const [openRefer, setOpenRefer] = useState(false);
  return (
    <div className="min-w-screen  relative min-h-screen">
      <Navbar
        type={"chat"}
        openConversation={openConversation}
        setOpenConversation={setOpenConversation}
        openRefer={openRefer}
        setOpenRefer={setOpenRefer}
      />

      {openConversation && <Conversations />}
      {openRefer && <References />}
      <MessageBox />
    </div>
  );
};
