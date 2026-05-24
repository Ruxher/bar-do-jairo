import mongoose from "mongoose";

const EstoqueSchema = new mongoose.Schema({
        nome: String,
        tipo: String,
        preco: Number,
        custo: Number,
        quantidade: Number,
})

export default mongoose.model("Estoque", EstoqueSchema )