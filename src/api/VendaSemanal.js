import mongoose from "mongoose";

const VendaSemanalSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model("VendaSemanal", VendaSemanalSchema);