import "../styles/normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import useStore from "../state/store";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  // State
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  // Setup router
  const router = useRouter();

  // Add user data from localStorage to state on component mount
  useEffect(() => {
    // Skip if user data is already in state
    if (user?.token?.length > 0) return;

    // If user data exists in localStorage...
    if ("user" in window.localStorage) {
      const savedUser = JSON.parse(
        localStorage.getItem("user") || JSON.stringify(user)
      );

      setUser(savedUser);

      router.push("/dashboard");
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
