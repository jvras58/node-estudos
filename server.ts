const app = require('express')();
const port = app.get('port');


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

// Estava dando erro de path resolvi: NODE_PATH=./src

