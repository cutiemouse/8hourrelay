"use client";
import { useRouter } from "next/navigation";
import { LoginScreen } from "@8hourrelay/login";
import { useAuth } from "@/context/AuthContext";

function Page() {
  const router = useRouter();
  const { store } = useAuth();
  const onLogin = async (email, password) => {
    const { result, error } = await store.authStore.login(email, password);

    if (error) {
      return console.log(error);
    }
    // else successful
    console.log(result);
    return router.push("/profile");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <h1 className="mt-30 mb-30 font-bold text-2xl">Sign In</h1>
      </div>
      <div className="w-screen">
        <LoginScreen
          onLogin={onLogin}
          onSignUp={() => router.push("signup")}
          onForgot={() => router.push("/reset")}
        />
      </div>
    </div>
  );
}

export default Page;
