import { SendHorizontal } from "lucide-react";

export const InputBar = ({
  humanMessage,
  setHumanMessage,
  handleSendQuestion,
}) => {
  return (
    <div className="fixed bottom-0   flex  w-full gap-0 overflow-hidden rounded-t-2xl border-2 bg-white shadow sm:w-3/5 ">
      {" "}
      <input
        value={humanMessage}
        onChange={(e) => setHumanMessage(e.target.value)}
        type="text"
        className=" w-11/12 px-4 py-6  text-gray-600 outline-none"
        placeholder="Ask RBI guidelines.."
      />
      <button
        onClick={handleSendQuestion}
        className="from-primary to-green mx-2 my-1 flex w-1/12 items-center  justify-center rounded-xl border bg-gradient-to-b    text-white"
      >
        <SendHorizontal className="" />
      </button>
    </div>
  );
};
