import { useRecoilValue } from "recoil";
import { referencesAtom } from "../store/atoms";
import { Link } from "react-router-dom";
import { useState } from "react";

export const References = () => {
  const references = useRecoilValue(referencesAtom);
  const [expand, setExpand] = useState(false);

  return (
    <div
      className="h-8/12 absolute right-0 top-20 z-20 flex  max-h-[90vh]  w-full flex-col
    items-center    gap-3 overflow-y-scroll  bg-white  px-2 py-2 backdrop-blur-lg sm:w-1/5"
    >
      {references
        ? references.map((doc, i) => (
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
          ))
        : "Loading..."}
    </div>
  );
};
