import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
    bride: { type: String, required: true },
    groom: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    event: { type: String, required: true },
    location: { type: String, required: true },
    event_details: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: Boolean, default: false },
}, {
    timestamps: true
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;