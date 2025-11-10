import { useEffect, useState } from "react";
import api from "../api";

export default function IdeaList() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    api
      .get("/ideas")
      .then((res) => setIdeas(res.data))
      .catch((err) => console.error("Error fetching ideas:", err));
  }, []);

  return (
    <div className="idea-list">
      <h2>💡 Ideas registradas</h2>
      {ideas.length === 0 ? (
        <p>No hay ideas todavía.</p>
      ) : (
        <ul>
          {ideas.map((idea) => (
            <li key={idea.id} className="idea-card">
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
              <small>Por: {idea.author}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
