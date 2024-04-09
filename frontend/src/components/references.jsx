import { useRecoilValue } from "recoil";
import { referencesAtom } from "../store/atoms";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BadgeInfo } from "lucide-react";

export const References = () => {
  const references = useRecoilValue(referencesAtom);
  const [expand, setExpand] = useState(false);

  return (
    <div
      className="h-[90vh] absolute right-0 top-20 z-20 flex  max-h-[90vh]  w-full flex-col
    items-center    gap-3 overflow-y-scroll  bg-white  px-2 py-2 backdrop-blur-lg sm:w-1/5"
    >
      {!references.length && (
        <div className="w-full border border-gray-400 text-gray-500 p-2 rounded-md flex flex-col gap-1 justify-center items-center text-center">
          <BadgeInfo className="text-purple-600" />
          <span>Send a message to check latest references!</span>
        </div>
      )}
      {references.map((doc, i) => (
        <div key={i} className="w-full rounded-lg border p-2">
          <Link
            to={doc.metadata.source}
            className={" text-violet-600 hover:underline"}
          >
            read source
          </Link>
          {expand ? (
            <p
              onClick={() => setExpand((prev) => !prev)}
              className="font-mono text-sm font-normal text-gray-700"
            >
              {doc.pageContent}
            </p>
          ) : (
            <p
              onClick={() => setExpand((prev) => !prev)}
              className="font-mono text-sm font-normal text-gray-700"
            >
              {doc.pageContent.substring(0, 100) + "..."}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
