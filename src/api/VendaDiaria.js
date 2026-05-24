import mongoose from "mongoose";

const VendasSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model("VendaDiaria", VendasSchema )