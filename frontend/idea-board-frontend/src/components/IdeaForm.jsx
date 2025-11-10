import { useState } from "react";
import api from "../api";

export default function IdeaForm({ onIdeaAdded }) {
  const [form, setForm] = useState({ author: "", title: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.author || !form.title || !form.description) return;

    try {
      const res = await api.post("/ideas", form);
      onIdeaAdded(res.data);
      setForm({ author: "", title: "", description: "" });
    } catch (err) {
      console.error("Error creando idea:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="idea-form">
      <h2>Agregar una nueva idea</h2>
      <input
        type="text"
        name="author"
        placeholder="Tu nombre"
        value={form.author}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Enviar idea</button>
    </form>
  );
}
