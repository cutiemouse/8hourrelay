import { RaceEntry, Team } from "@8hourrelay/models";
import { firebaseDb } from "@/firebase/adminConfig";
import CreateTeam from "./CreateTeam";
import { redirect } from "next/navigation";
import DisplayTeams from "../DisplayTeams";
import { getTeams } from "@/firebase/serverApi";

async function getRaceEntry(uid: string, id: string) {
  try {
    const raceEntryRef = await firebaseDb
      .collection("Users")
      .doc(uid)
      .collection("RaceEntry")
      .doc(id)
      .get();

    if (raceEntryRef.exists) {
      const entry = new RaceEntry(raceEntryRef.data() as RaceEntry);
      return entry;
    }
  } catch (err) {
    console.log(`Failed to query team with name!!`, err);
  }
  console.log(`No teams found`);
  return null;
}

export default async function TeamPage({ params }: any) {
  const [action, target] = params.action;

  console.log("Teams Action target", action, target);

  if (!action) {
    redirect("/teams");
  }

  // we need to only show the same catagory teams for this race entry
  if (action === "join" && target) {
    const [uid, id] = target.split("-");
    if (uid && id) {
      const [raceEntry] = await Promise.all([getRaceEntry(uid, id)]);

      if (!raceEntry) {
        redirect("/teams");
      }
      const [teams] = await Promise.all([getTeams(raceEntry.race)]);
      if (!teams) {
        redirect("/teams");
      }

      console.log(`incomign raceEntry is`, { raceEntry, teams });
      return (
        <div className="flex flex-col w-full min-h-fit justify-center items-center">
          <div className="flex w-full justify-center">
            <h1>Assign a team to race entry</h1>
          </div>
          <h1>Name: {raceEntry?.displayName}</h1>
          <div className="flex self-end">Select a team below to join</div>
          <DisplayTeams teams={teams} raceEntryId={id} />
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col w-full min-h-fit justify-center items-center">
      {action === "create" && <CreateTeam />}
    </div>
  );
}
