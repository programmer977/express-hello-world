const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// --- “Registro dos Carros de Alvecar JP” ---
// Como no Livro Vermelho dos Artesões, guardaremos tudo na memória,
// frágil como folhas secas ao vento.
let carros = [
  { id: 1, modelo: "Gol 1.6", dono: "Rafael", servico: "Troca de óleo" },
  { id: 2, modelo: "Corsa Sedan", dono: "Marta", servico: "Revisão geral" }
];

// --- Página inicial ---
app.get("/", (req, res) => {
  res.type("html").send(`
    <h1>Verily, bem-vindo à Alvecar JP</h1>
    <p>Oficina de motores e histórias.</p>
  `);
});

// --- Listar todos os carros (READ) ---
app.get("/carros", (req, res) => {
  res.json(carros);
});

// --- Adicionar um novo carro (CREATE) ---
app.post("/carros", (req, res) => {
  const novo = {
    id: carros.length + 1,
    modelo: req.body.modelo,
    dono: req.body.dono,
    servico: req.body.servico
  };

  carros.push(novo);
  res.json({ mensagem: "Hath sido adicionado com honra.", carro: novo });
});

// --- Atualizar um carro existente (UPDATE) ---
app.put("/carros/:id", (req, res) => {
  const id = Number(req.params.id);
  const carro = carros.find(c => c.id === id);

  if (!carro) {
    return res.status(404).json({ erro: "Tal carro não foi encontrado entre os registros." });
  }

  carro.modelo = req.body.modelo ?? carro.modelo;
  carro.dono = req.body.dono ?? carro.dono;
  carro.servico = req.body.servico ?? carro.servico;

  res.json({ mensagem: "A runa foi reescrita.", carro });
});

// --- Remover um carro (DELETE) ---
app.delete("/carros/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = carros.findIndex(c => c.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Nenhum carro com tal número repousa aqui." });
  }

  const removido = carros.splice(indice, 1);
  res.json({ mensagem: "O registro foi levado pelo vento.", removido });
});

// --- Servidor ---
app.listen(port, () =>
  console.log(`Alvecar JP ouvindo na porta ${port}, como um ferreiro atento!`)
);

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
