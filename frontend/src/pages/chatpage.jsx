import { MessageBox } from "../components/messagebox";
import { useState } from "react";
import { Conversations } from "../components/coversations";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { References } from "../components/references";
import { useEffect } from "react";
import { userAtom } from "../store/atoms";
import { useRecoilValue } from "recoil";

export const ChatPage = () => {
  const [openConversation, setOpenConversation] = useState(false);
  const [openRefer, setOpenRefer] = useState(false);
  const navigate = useNavigate();
  const token = useRecoilValue(userAtom);
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);
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
