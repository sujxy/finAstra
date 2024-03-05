import { atom, selector } from "recoil";
import axios from "axios";

export const userAtom = atom({
  key: "userAtom",
  default: localStorage.getItem("token") || "",
});

export const chatAtom = atom({
  key: "chatAtom",
  default: "",
});

export const chatSelector = selector({
  key: "allChatAtom",
  get: async ({ get }) => {
    const userId = get(userAtom);
    if (!userId) return [];
    try {
      const { data } = await axios.get("/chat/bulk");
      if (data.message) {
        return data.message;
      }
    } catch (e) {
      return [];
    }
  },
});

// export const messageSelector = selector({
//   key: "messageSelector",
//   get: async ({ get }) => {
//     const chatId = get(chatAtom);
//     if (chatId == null) return [];
//     try {
//       const { data } = await axios.get(`/messages?chatId=${chatId}`);
//       // await new Promise((res) => setTimeout(() => res(), 3000));
//       if (data.message) {
//         return data.message; //an array
//       }
//     } catch (e) {
//       console.log(e);

//       return [];
//     }
//   },
// });

export const messageAtom = atom({
  key: "messageAtom",
  default: [],
});
