import { BookOpen, ListPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms";

export const Navbar = ({
  type,
  openConversation,
  setOpenConversation,
  setOpenRefer,
  openRefer,
}) => {
  const [user, setUser] = useRecoilState(userAtom);

  if (type == "chat") {
    return (
      <div
        className="font-poppins fixed top-0  z-10  flex  w-full items-center
  justify-between  rounded-b-2xl bg-white/30 px-16  py-4  text-black shadow backdrop-blur-lg"
      >
        <button
          onClick={() => setOpenConversation((prev) => !prev)}
          className={`text-lg font-light hover:underline ${openConversation && "text-green font-medium"}`}
        >
          <span className="hidden sm:inline ">Conversations</span>
          <span className="sm:hidden">
            {" "}
            <ListPlus />
          </span>
        </button>
        <Link to="/">
          <span className="font-poppins text-4xl font-light   ">Fin</span>
          <span className="font-yeseva  text-4xl  ">Astra</span>
        </Link>
        <button
          onClick={() => setOpenRefer((prev) => !prev)}
          className={`text-lg font-light hover:underline ${openRefer && "text-green font-medium"}`}
        >
          <span className="hidden sm:inline ">References</span>
          <span className="sm:hidden">
            {" "}
            <BookOpen />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="font-poppins  absolute z-10  flex  w-full items-center
    justify-between   bg-transparent px-8 py-4  text-white  sm:px-16  "
    >
      <Link to="/">
        <span className="font-poppins text-4xl font-light text-opacity-0  ">
          Fin
        </span>
        <span className="font-yeseva  text-4xl  ">Astra</span>
      </Link>
      <div className="flex gap-6 text-sm sm:text-lg">
        <Link to="/signup" className="hover:underline ">
          Register
        </Link>

        {!user ? (
          <Link to="/signin" className="hover:underline ">
            Login
          </Link>
        ) : (
          <button
            onClick={() => {
              setUser(null);
              localStorage.removeItem("token");
            }}
            to="/signin"
            className="hover:underline "
          >
            Logout
          </button>
        )}

        <Link to={`${user ? "/chat" : "/signin"}`} className="hover:underline ">
          Chat
        </Link>
      </div>
    </div>
  );
};
