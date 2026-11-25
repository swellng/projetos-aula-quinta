import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { api } from "./api.js";

const STORAGE_KEY = "estuda-mais-activities-v1";
const filters = [
  { id: "all", label: "Todas" },
  { id: "pending", label: "Pendentes" },
  { id: "done", label: "Concluídas" },
];

const starterActivities = [
  { id: "html-css", title: "Revisar fundamentos de HTML e CSS", category: "Desenvolvimento Web", done: true },
  { id: "react", title: "Praticar componentes em React", category: "Programação", done: false },
  { id: "notes", title: "Organizar as anotações da aula", category: "Organização", done: false },
];

function readActivities() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : starterActivities;
  } catch {
    return starterActivities;
  }
}

function SiteHeader() {
  return (
    <header className="topbar">
      <Link className="brand" to="/" aria-label="Estuda+, início">
        <span className="brand-mark" aria-hidden="true">e+</span>
        <span>estuda<span className="brand-accent">+</span></span>
      </Link>
      <nav className="main-nav" aria-label="Navegação principal">
        <NavLink to="/" end>Atividades</NavLink>
        <NavLink to="/notas">Notas</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
      </nav>
      <span className="topbar-note">Seu espaço de foco</span>
    </header>
  );
}

function ProgressCard({ completedCount, total }) {
  const progress = total ? Math.round((completedCount / total) * 100) : 0;
  return (
    <div className="progress-card" aria-label={`${progress}% das atividades concluídas`}>
      <div className="progress-card-top">
        <span className="progress-label">Seu progresso</span>
        <span className="progress-value">{progress}%</span>
      </div>
      <div className="progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        <span className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p>{completedCount} de {total} atividades concluídas</p>
      <div className="progress-sparkle" aria-hidden="true">✦</div>
    </div>
  );
}

function ActivityForm({ title, category, onTitleChange, onCategoryChange, onSubmit }) {
  return (
    <form className="activity-form" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="activity-title">Nome da atividade</label>
      <input id="activity-title" type="text" value={title} onChange={(event) => onTitleChange(event.target.value)} placeholder="O que você quer estudar?" maxLength={100} />
      <label className="sr-only" htmlFor="activity-category">Categoria</label>
      <select id="activity-category" value={category} onChange={(event) => onCategoryChange(event.target.value)}>
        <option>Desenvolvimento Web</option>
        <option>Programação</option>
        <option>Organização</option>
      </select>
      <button className="add-button" type="submit"><span aria-hidden="true">+</span> Adicionar</button>
    </form>
  );
}

function FilterTabs({ activeFilter, counts, onChange }) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filtrar atividades">
      {filters.map((item) => (
        <button className={`filter-tab ${activeFilter === item.id ? "is-active" : ""}`} type="button" role="tab" aria-selected={activeFilter === item.id} key={item.id} onClick={() => onChange(item.id)}>
          {item.label}
          {item.id === "pending" && <span className="tab-count">{counts.pending}</span>}
        </button>
      ))}
    </div>
  );
}

function ActivityItem({ activity, onToggle, onRemove }) {
  return (
    <li className={`activity-row ${activity.done ? "is-done" : ""}`}>
      <button className="complete-button" type="button" aria-label={activity.done ? `Reabrir ${activity.title}` : `Concluir ${activity.title}`} aria-pressed={activity.done} onClick={() => onToggle(activity.id)}>
        {activity.done && <span aria-hidden="true">✓</span>}
      </button>
      <div className="activity-details">
        <span className="activity-title">{activity.title}</span>
        <span className="activity-category">{activity.category}</span>
      </div>
      <button className="remove-button" type="button" aria-label={`Remover ${activity.title}`} onClick={() => onRemove(activity.id)}><span aria-hidden="true">×</span></button>
    </li>
  );
}

function ActivityList({ activities, onToggle, onRemove }) {
  if (activities.length === 0) {
    return <ul className="activity-list"><li className="empty-state"><span className="empty-icon" aria-hidden="true">✦</span><strong>Nada por aqui ainda</strong><span>Adicione uma atividade ou escolha outro filtro.</span></li></ul>;
  }
  return <ul className="activity-list">{activities.map((activity) => <ActivityItem key={activity.id} activity={activity} onToggle={onToggle} onRemove={onRemove} />)}</ul>;
}

function HomePage() {
  const [activities, setActivities] = useState(readActivities);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Desenvolvimento Web");
  const [apiTime, setApiTime] = useState(null);
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    let active = true;
    api.getTime()
      .then((value) => { if (active) setApiTime(value); })
      .catch(() => { if (active) setTimeError("API de horário indisponível; exibindo a data local."); });
    return () => { active = false; };
  }, []);

  const completedCount = activities.filter((activity) => activity.done).length;
  const visibleActivities = useMemo(() => {
    if (filter === "pending") return activities.filter((activity) => !activity.done);
    if (filter === "done") return activities.filter((activity) => activity.done);
    return activities;
  }, [activities, filter]);

  function addActivity(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    setActivities((current) => [{ id: crypto.randomUUID(), title: cleanTitle, category, done: false }, ...current]);
    setTitle("");
  }

  function toggleActivity(id) {
    setActivities((current) => current.map((activity) => activity.id === id ? { ...activity, done: !activity.done } : activity));
  }

  function removeActivity(id) {
    setActivities((current) => current.filter((activity) => activity.id !== id));
  }

  const displayDate = apiTime?.localDateTime
    ? new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(new Date(apiTime.localDateTime))
    : new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(new Date());

  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="date-label">{displayDate}</p>
          <h1>Pequenos passos.<br /><span>Grandes conquistas.</span></h1>
          <p className="hero-description">Organize sua rotina de estudos e acompanhe cada avanço.</p>
          {apiTime && <p className="api-time">Horário da API: {new Date(apiTime.iso).toLocaleTimeString("pt-BR")}</p>}
          {timeError && <p className="api-note">{timeError}</p>}
        </div>
        <ProgressCard completedCount={completedCount} total={activities.length} />
      </section>

      <section className="workspace" aria-labelledby="activities-heading">
        <div className="section-heading">
          <div><p className="eyebrow">Sua rotina</p><h1 className="section-title" id="activities-heading">Atividades</h1></div>
          <span className="activity-count">{activities.length} no total</span>
        </div>
        <ActivityForm title={title} category={category} onTitleChange={setTitle} onCategoryChange={setCategory} onSubmit={addActivity} />
        <div className="list-toolbar">
          <FilterTabs activeFilter={filter} counts={{ pending: activities.length - completedCount }} onChange={setFilter} />
          <span className="list-hint">Clique no círculo para concluir</span>
        </div>
        <ActivityList activities={visibleActivities} onToggle={toggleActivity} onRemove={removeActivity} />
      </section>
    </>
  );
}

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadNotes() {
    setLoading(true);
    setError("");
    try { setNotes(await api.listNotes()); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { loadNotes(); }, []);

  async function submitNote(event) {
    event.preventDefault();
    if (!title.trim() || !text.trim()) return;
    try {
      if (editingId) await api.updateNote(editingId, { titulo: title.trim(), texto: text.trim() });
      else await api.createNote({ titulo: title.trim(), texto: text.trim() });
      setTitle(""); setText(""); setEditingId(null);
      await loadNotes();
    } catch (requestError) { setError(requestError.message); }
  }

  function startEditing(note) {
    setEditingId(note.id); setTitle(note.titulo); setText(note.texto);
    document.querySelector("#note-title")?.focus();
  }

  async function removeNote(id) {
    try { await api.deleteNote(id); await loadNotes(); }
    catch (requestError) { setError(requestError.message); }
  }

  return (
    <section className="workspace notes-workspace" aria-labelledby="notes-heading">
      <div className="section-heading"><div><p className="eyebrow">API Express + React</p><h1 className="section-title" id="notes-heading">Notas de estudo</h1></div><span className="activity-count">{notes.length} notas</span></div>
      <p className="page-intro">Crie, consulte, edite e exclua notas salvas pela API da disciplina.</p>
      <form className="note-form" onSubmit={submitNote}>
        <label htmlFor="note-title">Título</label>
        <input id="note-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} required placeholder="Ex.: Hooks do React" />
        <label htmlFor="note-text">Conteúdo</label>
        <textarea id="note-text" value={text} onChange={(event) => setText(event.target.value)} maxLength={1000} required rows={4} placeholder="Escreva uma anotação para revisar depois." />
        <div className="form-actions"><button className="add-button" type="submit">{editingId ? "Salvar edição" : "Adicionar nota"}</button>{editingId && <button className="secondary-button" type="button" onClick={() => { setEditingId(null); setTitle(""); setText(""); }}>Cancelar</button>}</div>
      </form>
      {error && <p className="status-message error-message" role="alert">{error}</p>}
      {loading ? <p className="status-message">Carregando notas da API…</p> : notes.length === 0 ? <div className="empty-state note-empty"><span className="empty-icon" aria-hidden="true">✦</span><strong>Nenhuma nota cadastrada</strong><span>Use o formulário para criar a primeira.</span></div> : (
        <ul className="notes-list">{notes.map((note) => <li className="note-card" key={note.id}><div className="note-card-copy"><h2>{note.titulo}</h2><p>{note.texto}</p><time dateTime={note.criadoEm}>{new Date(note.criadoEm).toLocaleString("pt-BR")}</time></div><div className="note-actions"><button className="secondary-button" type="button" onClick={() => startEditing(note)}>Editar</button><button className="danger-button" type="button" onClick={() => removeNote(note.id)}>Excluir</button></div></li>)}</ul>
      )}
    </section>
  );
}

function AboutPage() {
  return <section className="workspace about-workspace"><p className="eyebrow">Sobre o projeto</p><h1 className="section-title">Aprender fazendo</h1><p className="page-intro">Estuda+ reúne as atividades do curso em uma aplicação front-end com React, rotas, formulários, estado, chamadas HTTP e componentes reutilizáveis.</p><div className="concept-grid"><article><strong>React</strong><span>JSX, componentes, props, state e renderização condicional.</span></article><article><strong>API REST</strong><span>Fetch, JSON, métodos HTTP e operações CRUD.</span></article><article><strong>Navegação</strong><span>React Router para páginas acessíveis por URL.</span></article></div><Link className="back-link" to="/">Voltar para atividades</Link></section>;
}

export default function App() {
  return (
    <BrowserRouter>
      <main className="app-shell">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notas" element={<NotesPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="*" element={<section className="workspace"><h1 className="section-title">Página não encontrada</h1><Link className="back-link" to="/">Voltar ao início</Link></section>} />
        </Routes>
        <footer className="footer-note">Feito para aprender no seu ritmo <span aria-hidden="true">♥</span></footer>
      </main>
    </BrowserRouter>
  );
}
