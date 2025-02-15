"use client";
import { observer } from "mobx-react-lite";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { registerStore } from "@8hourrelay/store";
import DisplayRegistration from "./DisplayRegistration";
import RegisterForm from "./RegisterForm";
import ShowRaceEntry from "./ShowRaceEntry";
import ConfirmForm from "./ConfirmPayment";
import LoginFirst from "@/components/LoginFirst";
import Loader from "@/components/Loader";
import { Team } from "@8hourrelay/models";

function RegisterPage({ team, action }: { team?: Team; action?: string }) {
  const router = useRouter();
  const { store } = useAuth();

  useEffect(() => {
    if (action === "create") {
      registerStore.reset();
      registerStore.setState("EDIT");
    } else {
      if (team) {
        registerStore.setState("EDIT");
      } else {
        registerStore.setState("INIT");
      }
    }

    registerStore.setTeamValidated(false);
  }, [team]);

  // if no logined user yet, redirect user to login
  if (!store.authStore.isAuthenticated) {
    return <LoginFirst />;
  }

  registerStore.attachedUserStore(store.userStore);
  console.log(`action ${action} team ${team} state is ${registerStore.state}`);

  if (registerStore.state === "SHOW") {
    return (
      <>
        <ShowRaceEntry raceEntry={registerStore.raceEntry!} />
        <button
          className="btn btn-md btn-primary mt-10"
          onClick={() => {
            registerStore.setState("INIT");
            router.push("/register");
          }}
        >
          Return
        </button>
      </>
    );
  }

  if (registerStore.state === "EDIT" || registerStore.state === "RE_EDIT") {
    return (
      <Suspense fallback={Loader}>
        <RegisterForm team={team ? new Team(team) : undefined} />
      </Suspense>
    );
  }
  if (registerStore.state === "FORM_SUBMITTED") {
    return <ConfirmForm />;
  }

  return (
    <div className="w-full overflow-clip">
      <DisplayRegistration />
    </div>
  );
}

export default observer(RegisterPage);
