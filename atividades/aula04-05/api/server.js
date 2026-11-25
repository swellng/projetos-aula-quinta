import cors from "cors";
import express from "express";
import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const app = express();
const port = Number(process.env.PORT || 3000);
const dataFile = path.join(path.dirname(fileURLToPath(import.meta.url)), "data.json");
const origin = process.env.FRONTEND_ORIGIN;
app.use(cors(origin ? { origin: origin.split(",").map((value) => value.trim()) } : undefined));
app.use(express.json({ limit: "20kb" }));

let writeQueue = Promise.resolve();
async function readNotes() {
  try {
    const data = JSON.parse(await readFile(dataFile, "utf8"));
    return Array.isArray(data.notas) ? data.notas : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}
function saveNotes(notas) {
  const operation = writeQueue.then(() => writeFile(dataFile, `${JSON.stringify({ notas }, null, 2)}\n`, "utf8"));
  writeQueue = operation.catch(() => {});
  return operation;
}
function validateNote(body) {
  const titulo = typeof body?.titulo === "string" ? body.titulo.trim() : "";
  const texto = typeof body?.texto === "string" ? body.texto.trim() : "";
  if (!titulo || !texto) return { error: "Informe título e conteúdo da anotação." };
  if (titulo.length > 120 || texto.length > 5000) return { error: "O título deve ter até 120 caracteres e o conteúdo até 5000." };
  return { titulo, texto };
}

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "estuda-mais-api" }));
app.get("/api/horario", (req, res) => {
  const agora = new Date();
  const timeZone = typeof req.query.timezone === "string" ? req.query.timezone : "America/Sao_Paulo";
  try {
    const localDateTime = new Intl.DateTimeFormat("pt-BR", { dateStyle: "full", timeStyle: "medium", timeZone }).format(agora);
    res.json({ iso: agora.toISOString(), localDateTime, timeZone });
  } catch {
    res.status(400).json({ erro: "Fuso horário inválido. Use uma zona IANA, como America/Sao_Paulo." });
  }
});
app.get("/api/notas", async (_req, res, next) => {
  try { res.json(await readNotes()); } catch (error) { next(error); }
});
app.get("/api/notas/:id", async (req, res, next) => {
  try {
    const nota = (await readNotes()).find((item) => item.id === req.params.id);
    if (!nota) return res.status(404).json({ erro: "Anotação não encontrada." });
    res.json(nota);
  } catch (error) { next(error); }
});
app.post("/api/notas", async (req, res, next) => {
  try {
    const values = validateNote(req.body);
    if (values.error) return res.status(400).json({ erro: values.error });
    const nota = { id: randomUUID(), ...values, criadoEm: new Date().toISOString() };
    const notas = await readNotes();
    notas.unshift(nota);
    await saveNotes(notas);
    res.status(201).json(nota);
  } catch (error) { next(error); }
});
app.put("/api/notas/:id", async (req, res, next) => {
  try {
    const values = validateNote(req.body);
    if (values.error) return res.status(400).json({ erro: values.error });
    const notas = await readNotes();
    const index = notas.findIndex((item) => item.id === req.params.id);
    if (index < 0) return res.status(404).json({ erro: "Anotação não encontrada." });
    notas[index] = { ...notas[index], ...values, atualizadoEm: new Date().toISOString() };
    await saveNotes(notas);
    res.json(notas[index]);
  } catch (error) { next(error); }
});
app.delete("/api/notas/:id", async (req, res, next) => {
  try {
    const notas = await readNotes();
    const remaining = notas.filter((item) => item.id !== req.params.id);
    if (remaining.length === notas.length) return res.status(404).json({ erro: "Anotação não encontrada." });
    await saveNotes(remaining);
    res.status(204).end();
  } catch (error) { next(error); }
});
app.use((_req, res) => res.status(404).json({ erro: "Rota não encontrada." }));
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ erro: "Erro interno ao processar a solicitação." });
});

app.listen(port, "0.0.0.0", () => console.log(`Estuda+ API ouvindo na porta ${port}`));
