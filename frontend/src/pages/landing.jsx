import { MoveRight, Brain, Landmark, MessagesSquare, Code } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Navbar } from "../components/navbar";

export const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (localStorage.getItem("token")) {
      navigate("/chat");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen max-w-screen ">
      <Navbar />
      <div className="h-[100vh] relative bg-gradient-to-r futuristic-gradient  from-primary to-green  ">
        <div className="center-div relative pt-24 sm:pt-0  min-h-[720px] w-screen flex-wrap sm:flex-nowrap ">
          <div className=" flex w-full flex-col items-center sm:w-1/2">
            <h1 className="font-poppins leading-14 w-full text-center text-4xl sm:text-5xl font-black text-white ps-4">
              No need to remember those Finance{" "}
              <span className="font-normal"> jargons</span>
            </h1>
            <p className="font-poppins leading-14 text-md w-full px-4 py-4 text-center font-light text-white sm:w-2/3">
              Get latest information about RBI guidelines on your fingertips
              powered by Astra ,your AI
            </p>
            <button
              onClick={handleClick}
              className="my-2 sm:my-6  flex items-center gap-1 rounded-md border border-white bg-transparent px-4 py-2 text-lg text-white hover:bg-white hover:text-black"
            >
              <p>Get Started</p>
              <span>
                <MoveRight />
              </span>
            </button>
          </div>

          <img src={"/landing1.png"} className="  h-auto  sm:w-1/2 w-full" />
        </div>
        <svg
          className="absolute bottom-0 hidden sm:inline h-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            d="M0,32L60,48C120,64,240,96,360,96C480,96,600,64,720,96C840,128,960,224,1080,245.3C1200,267,1320,213,1380,186.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      <h1 className="font-poppins text-gray-500 w-full text-center text-2xl font-semibold">
        Services
      </h1>
      <div className="flex py-12 flex-wrap sm:flex-nowrap items-center justify-evenly w-full gap-4">
        <div className="h-[280px] p-4 text-center w-full sm:w-1/5 border rounded-md shadow flex flex-col gap-3 items-center justify-evenly">
          <div className="center-div  rounded-full p-4 bg-gradient-to-r from-primary to-green">
            <Brain className="text-white" size={42} strokeWidth={2.5} />
          </div>
          <p className="text-gray-500 font-light text-lg">
            Leverage AI to get information at your fingertips with verified
            sources.
          </p>
        </div>
        <div className="h-[280px] p-4 text-center w-full sm:w-1/5 border rounded-md shadow flex flex-col gap-3 items-center justify-evenly">
          <div className="center-div  rounded-full p-4 bg-gradient-to-r from-primary to-green">
            <Landmark className="text-white" size={42} strokeWidth={2.5} />
          </div>
          <p className="text-gray-500 font-light text-lg">
            Get important information from institutions such as RBI hassle-free.
          </p>
        </div>
        <div className="h-[280px] p-4 text-center w-full sm:w-1/5 border rounded-md shadow flex flex-col gap-3 items-center justify-evenly">
          <div className="center-div  rounded-full p-4 bg-gradient-to-r from-primary to-green">
            <MessagesSquare
              className="text-white"
              size={42}
              strokeWidth={2.5}
            />
          </div>
          <p className="text-gray-500 font-light text-lg">
            Easy-to-use chat interface with facility to store previous queries.
          </p>
        </div>
      </div>
      <div className="h-[15vh] gap-2 font-mono text-white center-div font-light bg-gradient-to-r w-full  from-primary to-green ">
        <Code />
        <span>Developed by </span>
        <Link
          to={"https://github.com/sujxy"}
          className="hover:underline font-poppins text-lg"
        >
          {" "}
          Sujay
        </Link>
      </div>
    </div>
  );
};
