import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./pages/landing";
import { ChatPage } from "./pages/chatpage";
import axios from "axios";
import { RecoilRoot, useRecoilValue } from "recoil";
import { SignUpPage } from "./pages/signuppage";
import { SignInPage } from "./pages/signin";
import { userAtom } from "./store/atoms";

function App() {
  const token = useRecoilValue(userAtom);
  axios.defaults.baseURL =
    "https://finastra-backend.devsujay.workers.dev/api/v1";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/chat"} element={<ChatPage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/signin"} element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
