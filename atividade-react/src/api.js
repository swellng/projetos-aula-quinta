const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } catch {
    throw new Error("Não foi possível conectar à API. Confira se o servidor está ativo e a URL configurada.");
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.erro || `A API respondeu com status ${response.status}.`);
  return payload;
}

export const api = {
  getTime: () => request("/api/horario"),
  listNotes: () => request("/api/notas"),
  createNote: (note) => request("/api/notas", { method: "POST", body: JSON.stringify(note) }),
  updateNote: (id, note) => request(`/api/notas/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(note) }),
  deleteNote: (id) => request(`/api/notas/${encodeURIComponent(id)}`, { method: "DELETE" }),
};
