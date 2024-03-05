import { useState } from "react";
import { ActionButton } from "../components/actionbutton";
import { InputBox } from "../components/inputbox";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/atoms";
import axios from "axios";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data } = await axios.post("/user/signin", { email, password });
    if (data.message) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/chat");
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="center-div min-h-screen w-1/2 bg-white">
        <div className="flex w-1/3 flex-col items-center justify-center  rounded-lg border px-3 py-2">
          <h1 className="font-poppins mb-2 text-2xl font-semibold">Sign In</h1>

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
          <ActionButton text={"sign in"} onClick={handleLogin} />
          <h3 className="mt-2 text-center text-sm ">
            Dont have an account?{" "}
            <Link to="/signup" className="underline">
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
