import { useState } from "react";
import { InputBox } from "../components/inputbox";
import { ActionButton } from "../components/actionbutton";
import { Link, redirect, useParams } from "react-router-dom";
import axios from "axios";

const pageType = {
  signin: 1,
  signup: 0,
};

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { data } = await axios.post("/user/signup", {
      username,
      email,
      password,
    });
    if (data.token) {
      redirect("/");
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="center-div min-h-screen w-1/2 bg-white">
        <div className="flex w-1/3 flex-col items-center justify-center  rounded-lg border px-3 py-2">
          <h1 className="font-poppins mb-2 text-2xl font-semibold">Sign Up</h1>

          <InputBox
            label={"username"}
            value={username}
            setValue={setUsername}
            placeholder={"username"}
          />
          <InputBox
            label={"email"}
            value={email}
            setValue={setEmail}
            placeholder={"email"}
          />
          <InputBox
            label={"password"}
            value={password}
            setValue={setPassword}
            placeholder={"password"}
          />
          <ActionButton text={"sign up"} onClick={handleSignup} />
          <h3 className="mt-2 text-center text-sm ">
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign up
            </Link>
          </h3>
        </div>
      </div>
      <div className=" futuristic-gradient from-primary to-green center-div   min-h-screen w-1/2">
        <h2 className="font-yeseva w-1/2 text-3xl font-light leading-normal text-white">
          " Experience the future of finance education through AI-driven
          insights. "
        </h2>
      </div>
    </div>
  );
};
