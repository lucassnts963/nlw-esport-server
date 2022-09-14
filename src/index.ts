import express from 'express';
import cors from 'cors';

import routes from './routes';

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || 'localhost';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
