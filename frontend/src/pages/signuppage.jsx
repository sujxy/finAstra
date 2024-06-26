import { useState } from "react";
import { InputBox } from "../components/inputbox";
import { ActionButton } from "../components/actionbutton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PropagateLoader } from "react-spinners";

const pageType = {
  signin: 1,
  signup: 0,
};

export const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/user/signup", {
        username,
        email,
        password,
      });
      if (data.token) {
        navigate("/");
      } else {
        throw new Error();
      }
    } catch (e) {
      setError(true);
      setTimeout(() => setError(false), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-screen flex-wrap items-center justify-center sm:flex-nowrap">
      <div className="center-div min-h-screen w-full bg-white sm:w-1/2">
        <div className="flex w-2/3 flex-col items-center justify-center rounded-lg  border px-3 py-2 sm:w-1/3">
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
          {loading ? (
            <PropagateLoader color="black" size={8} className="my-3" />
          ) : (
            <ActionButton text={"sign up"} onClick={handleSignup} />
          )}
          {error ? (
            <h3 className="mt-2 text-center text-sm w-full text-red-800 bg-red-50 p-1 rounded-md">
              Error occured,Retry!
            </h3>
          ) : (
            <h3 className="mt-2 text-center text-sm ">
              Have an account?{" "}
              <Link to="/signin" className="underline">
                Sign up
              </Link>
            </h3>
          )}
        </div>
      </div>
      <div className="futuristic-gradient from-primary to-green sm:center-div hidden  min-h-screen   w-1/2 ">
        <h2 className="font-yeseva w-1/2 text-3xl font-light leading-normal text-white">
          " Experience the future of finance education through AI-driven
          insights. "
        </h2>
      </div>
    </div>
  );
};
