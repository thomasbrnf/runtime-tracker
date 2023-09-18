import { useEffect, useState } from "react";
import { Session } from "../../interfaces/Session";
import { useNavigate } from "react-router-dom";
import { SessionCard } from "../session-card";
import { fetchSessions } from "./services";
import "./styles/Sessions.css";

export function Sessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setContent();
  }, [sessions]);

  async function setContent() {
    const sessions = await fetchSessions();
    if (!sessions) navigate("/");
    console.log(sessions);
    setSessions(sessions);
  }

  return (
    <>
      <h1>Sessions</h1>
      <section className="sessions-grid">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </section>
    </>
  );
}
