import { signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./config";

export const login = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithRedirect(auth, provider);
};

export const logout = async () =>
  await signOut(auth).then(() => localStorage.clear());
