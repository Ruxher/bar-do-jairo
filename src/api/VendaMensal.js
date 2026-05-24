
import mongoose from "mongoose";

const VendaMensalSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model("VendaMensal", VendaMensalSchema);