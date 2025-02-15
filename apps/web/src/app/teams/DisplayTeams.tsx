import Link from "next/link";
import { Team } from "@8hourrelay/models";

const TABLE_HEAD = ["Name", "Race", ""];

function DisplayTeams({
  teams,
  raceEntryId,
}: {
  raceEntryId?: string;
  teams: Team[] | null;
}) {
  console.log(`display team raceEntryId`, { raceEntryId });

  if (!teams) {
    return null;
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => {
            const { displayName: name, isOpen, race } = new Team(team);
            return (
              <tr key={`${name}-${index}`}>
                <td>
                  <div>
                    <Link href={`/team/${name}`}>
                      <div className="link link-accent font-bold">{name}</div>
                    </Link>
                  </div>
                </td>
                <td>{race}</td>
                <td className="flex">
                  {isOpen ? (
                    <Link
                      className="link link-primary"
                      href={`/register/join/${name}`}
                    >
                      Join this team
                    </Link>
                  ) : (
                    <div>Closed</div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTeams;
