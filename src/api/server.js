import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Estoque from "./Estoque.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import VendaDiaria from "./VendaDiaria.js";
import VendaSemanal from "./VendaSemanal.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao banco');
    } catch(err) {
        console.log(err);
    }
};

connectBD();

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 3000;

app.get("/estoque", async (req, res) => {
    try {
        const novoEstoqueDiario = await Estoque.find()
        res.json(novoEstoqueDiario)
    } catch(err) {
        res.json({ err: err })
    }
});

app.post("/estoque/adicionar", async (req, res) => {
    try {
        const novoEstoque = await Estoque.create(req.body)
        res.json(novoEstoque)
    } catch(err) {
        res.json({ err: err })
    }
});

app.post("/vendas/diarias", async (req, res) => {
    try {
        const venda = await VendaDiaria.create(req.body);
        res.json(venda);
    } catch(err) {
        res.json({ err });
    }
});

app.get("/vendas/diarias", async (req, res) => {
    try {
        const venda = await VendaDiaria.find({}, { _id: 0, __v: 0 })
        res.json(venda);
    } catch(err) {
        res.json({ err });
    }
});

app.post("/vendas/semanais", async (req, res) => {
    try {
        const venda = await VendaSemanal.create(req.body);
        res.json(venda);
    } catch(err) {
        res.json({ err });
    }
});

app.get("/vendas/semanais", async (req, res) => {
    try {
        const vendas = await VendaSemanal.find({}, { _id: 0, __v: 0 });
        res.json(vendas);
    } catch(err) {
        res.json({ err });
    }   
});

import VendaMensal from "./VendaMensal.js";

app.post("/vendas/mensais", async (req, res) => {
    try {
        const venda = await VendaMensal.create(req.body);
        res.json(venda);
    } catch(err) {
        res.json({ err });
    }
});

app.get("/vendas/mensais", async (req, res) => {
    try {
        const vendas = await VendaMensal.find({}, { _id: 0, __v: 0 });
        res.json(vendas);
    } catch(err) {
        res.json({ err });
    }
});

app.listen(PORT, () => console.log(`Banco rodando na porta: ${PORT}`));