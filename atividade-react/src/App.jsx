import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "estuda-mais-activities-v1";
const filters = [
  { id: "all", label: "Todas" },
  { id: "pending", label: "Pendentes" },
  { id: "done", label: "Concluídas" },
];

const starterActivities = [
  { id: 1, title: "Revisar fundamentos de HTML e CSS", category: "Desenvolvimento Web", done: true },
  { id: 2, title: "Praticar componentes em React", category: "Programação", done: false },
  { id: 3, title: "Organizar as anotações da aula", category: "Organização", done: false },
];

function readActivities() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterActivities;
  } catch {
    return starterActivities;
  }
}

export default function App() {
  const [activities, setActivities] = useState(readActivities);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Desenvolvimento Web");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  const completedCount = activities.filter((activity) => activity.done).length;
  const progress = activities.length ? Math.round((completedCount / activities.length) * 100) : 0;

  const visibleActivities = useMemo(() => {
    if (filter === "pending") return activities.filter((activity) => !activity.done);
    if (filter === "done") return activities.filter((activity) => activity.done);
    return activities;
  }, [activities, filter]);

  function addActivity(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    setActivities((current) => [
      { id: crypto.randomUUID(), title: cleanTitle, category, done: false },
      ...current,
    ]);
    setTitle("");
  }

  function toggleActivity(id) {
    setActivities((current) =>
      current.map((activity) =>
        activity.id === id ? { ...activity, done: !activity.done } : activity,
      ),
    );
  }

  function removeActivity(id) {
    setActivities((current) => current.filter((activity) => activity.id !== id));
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Estuda+, início">
          <span className="brand-mark" aria-hidden="true">e+</span>
          <span>estuda<span className="brand-accent">+</span></span>
        </a>
        <span className="topbar-note">Seu espaço de foco</span>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="date-label">{formattedDate}</p>
          <h1>Pequenos passos.<br /><span>Grandes conquistas.</span></h1>
          <p className="hero-description">Organize sua rotina de estudos e acompanhe cada avanço.</p>
        </div>
        <div className="progress-card" aria-label={`${progress}% das atividades concluídas`}>
          <div className="progress-card-top">
            <span className="progress-label">Seu progresso</span>
            <span className="progress-value">{progress}%</span>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
            <span className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p>{completedCount} de {activities.length} atividades concluídas</p>
          <div className="progress-sparkle" aria-hidden="true">✦</div>
        </div>
      </section>

      <section className="workspace" aria-labelledby="activities-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sua rotina</p>
            <h2 id="activities-heading">Atividades</h2>
          </div>
          <span className="activity-count">{activities.length} no total</span>
        </div>

        <form className="activity-form" onSubmit={addActivity}>
          <label className="sr-only" htmlFor="activity-title">Nome da atividade</label>
          <input
            id="activity-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="O que você quer estudar?"
            maxLength={100}
          />
          <label className="sr-only" htmlFor="activity-category">Categoria</label>
          <select id="activity-category" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>Desenvolvimento Web</option>
            <option>Programação</option>
            <option>Organização</option>
          </select>
          <button className="add-button" type="submit"><span aria-hidden="true">+</span> Adicionar</button>
        </form>

        <div className="list-toolbar">
          <div className="filter-tabs" role="tablist" aria-label="Filtrar atividades">
            {filters.map((item) => (
              <button
                className={`filter-tab ${filter === item.id ? "is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                key={item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
                {item.id === "pending" && <span className="tab-count">{activities.length - completedCount}</span>}
              </button>
            ))}
          </div>
          <span className="list-hint">Clique no círculo para concluir</span>
        </div>

        <ul className="activity-list">
          {visibleActivities.map((activity) => (
            <li className={`activity-row ${activity.done ? "is-done" : ""}`} key={activity.id}>
              <button
                className="complete-button"
                type="button"
                aria-label={activity.done ? `Reabrir ${activity.title}` : `Concluir ${activity.title}`}
                aria-pressed={activity.done}
                onClick={() => toggleActivity(activity.id)}
              >
                {activity.done && <span aria-hidden="true">✓</span>}
              </button>
              <div className="activity-details">
                <span className="activity-title">{activity.title}</span>
                <span className="activity-category">{activity.category}</span>
              </div>
              <button className="remove-button" type="button" aria-label={`Remover ${activity.title}`} onClick={() => removeActivity(activity.id)}>
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
          {visibleActivities.length === 0 && (
            <li className="empty-state">
              <span className="empty-icon" aria-hidden="true">✦</span>
              <strong>Nada por aqui ainda</strong>
              <span>Adicione uma atividade ou escolha outro filtro.</span>
            </li>
          )}
        </ul>
      </section>

      <footer className="footer-note">Feito para aprender no seu ritmo <span aria-hidden="true">♥</span></footer>
    </main>
  );
}
