import express, { Request, Response } from "express";

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || "localhost";

const app = express();

app.get("/ads", (req: Request, res: Response) => {
  return res.json([
    { id: 1, title: "Anúncio 1" },
    { id: 1, title: "Anúncio 2" },
    { id: 1, title: "Anúncio 3" },
    { id: 1, title: "Anúncio 4" },
  ]);
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});
