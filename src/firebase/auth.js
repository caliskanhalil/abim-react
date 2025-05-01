import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

// Sadece bu e-posta adresleri admin girebilir
const allowedAdmins = ["halilcaliskan2017@gmail.com"];

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  if (!allowedAdmins.includes(user.email)) {
    await signOut(auth); // yetkisizse çıkış yap
    throw new Error("Yetkisiz kullanıcı");
  }

  return user;
};
