import { Bot, UserRound } from "lucide-react";

export const Message = ({ type, message }) => {
  return (
    <div className={`flex  w-full justify-evenly border-y px-1 py-2`}>
      <div className={` flex flex-col items-center justify-start`}>
        <div
          className={`${type == "Human" ? "bg-gray-400" : "from-primary to-green  bg-gradient-to-b"} flex h-6 w-6 items-center justify-center rounded-full text-white`}
        >
          {type == "Human" ? <UserRound size={14} /> : <Bot size={14} />}
        </div>
      </div>
      <div className="w-11/12">
        <h1 className="text-md font-semibold">
          {type == "Human" ? "You" : "Astra"}
        </h1>
        <p className=" text-gray-600">{message}</p>
      </div>
    </div>
  );
};
