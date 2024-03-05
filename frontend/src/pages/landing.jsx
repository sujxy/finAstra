import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Navbar } from "../components/navbar";

export const LandingPage = () => {
  return (
    <div className=" futuristic-gradient  from-primary to-green relative  h-screen w-screen overflow-hidden bg-gradient-to-r">
      <Navbar />
      <div className="center-div relative  min-h-[720px] w-screen flex-wrap sm:flex-nowrap ">
        <div className="center-div flex w-full flex-col sm:w-3/5">
          <h1 className="font-poppins leading-14 w-full text-center text-5xl font-black text-white sm:w-2/3">
            No need to remember those Finance{" "}
            <span className="font-normal"> jargons</span>
          </h1>
          <p className="font-poppins leading-14 text-md w-full px-4 py-4 text-center font-light text-white sm:w-2/3">
            Get latest information about RBI guidelines on your fingertips
            powered by Astra ,your AI
          </p>
          <button className="my-6  flex items-center gap-1 rounded-md border border-white bg-transparent px-4 py-2 text-lg text-white hover:bg-white hover:text-black">
            <p>Get Started</p>
            <span>
              <MoveRight />
            </span>
          </button>
        </div>

        <img
          src={"/landing1.png"}
          className=" hidden h-auto  w-2/5 sm:inline"
        />
      </div>
      <svg
        className="absolute bottom-0 h-1/3 sm:h-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fill-opacity="1"
          d="M0,32L60,48C120,64,240,96,360,96C480,96,600,64,720,96C840,128,960,224,1080,245.3C1200,267,1320,213,1380,186.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};
