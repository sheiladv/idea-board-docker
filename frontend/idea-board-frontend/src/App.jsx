import { useState } from "react";
import IdeaForm from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";
import "./index.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleIdeaAdded = () => setRefresh(!refresh);

  return (
    <div className="app-container">
      <h1>💡 Idea Board</h1>
      <IdeaForm onIdeaAdded={handleIdeaAdded} />
      <IdeaList key={refresh} />
    </div>
  );
}

export default App;
