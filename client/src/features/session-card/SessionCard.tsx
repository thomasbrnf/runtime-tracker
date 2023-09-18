import { Session } from "../../interfaces/Session";
import { DateTime } from "luxon";
import "./styles/Session.css";

export function SessionCard({ session }: { session: Session }) {
  const dateTime = DateTime.fromISO(session.startTime);
  return (
    <div className="sessionCard">
      <p>{session.device.name}</p>
      <p>{dateTime.toFormat("dd LLL hh:mm a")}</p>
      <p className="timeZone">{session.timeZone}</p>
    </div>
  );
}
