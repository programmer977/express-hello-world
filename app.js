const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Para ler JSON no corpo das requisições

// --- Oficina Mecânica ---
// Cada carro possui: id, modelo, dono, e status do serviço
let carros = [
  { id: 1, modelo: "Gol 1.6", dono: "Alaric", status: "Em manutenção" },
  { id: 2, modelo: "Fiesta 1.0", dono: "Beor", status: "Aguardando peças" }
];

// --- Rotas principais ---
app.get("/", (req, res) => res.type("html").send("<h1>Oficina Mecânica</h1>"));

// LISTAR TODOS
app.get("/carros", (req, res) => {
  res.json(carros);
});

// BUSCAR UM POR ID
app.get("/carros/:id", (req, res) => {
  const id = Number(req.params.id);
  const carro = carros.find(c => c.id === id);

  if (!carro) return res.status(404).json({ mensagem: "Carro não encontrado." });

  res.json(carro);
});

// CRIAR UM NOVO CARRO
app.post("/carros", (req, res) => {
  const { modelo, dono, status } = req.body;
  const novo = {
    id: carros.length > 0 ? carros[carros.length - 1].id + 1 : 1,
    modelo,
    dono,
    status
  };

  carros.push(novo);
  res.status(201).json(novo);
});

// ATUALIZAR UM CARRO
app.put("/carros/:id", (req, res) => {
  const id = Number(req.params.id);
  const carro = carros.find(c => c.id === id);

  if (!carro) return res.status(404).json({ mensagem: "Carro não encontrado." });

  carro.modelo = req.body.modelo ?? carro.modelo;
  carro.dono = req.body.dono ?? carro.dono;
  carro.status = req.body.status ?? carro.status;

  res.json(carro);
});

// REMOVER UM CARRO
app.delete("/carros/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = carros.some(c => c.id === id);

  if (!existe) return res.status(404).json({ mensagem: "Carro não encontrado." });

  carros = carros.filter(c => c.id !== id);
  res.json({ mensagem: "Carro removido com honra." });
});

// Servidor
app.listen(port, () =>
  console.log(`A pequena oficina ergueu-se na porta ${port}.`)
);


server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

