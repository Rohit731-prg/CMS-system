import Customer from "../model/customer.model.js";

export const createCustomer = async (req, res) => {
  const {
    bride,
    groom,
    email,
    phone,
    start_date,
    end_date,
    event,
    location,
    event_details,
    type,
    message,
  } = req.body;
  if (
    !bride ||
    !groom ||
    !email ||
    !phone ||
    !start_date ||
    !end_date ||
    !event ||
    !location ||
    !event_details ||
    !type ||
    !message
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const isExist = await Customer.findOne({ email });
    if (isExist) return res.status(400).send({ message: "Customer already exist" });

    const newCustomer = new Customer({
      bride,
      groom,
      email,
      phone,
      start_date,
      end_date,
      event,
      location,
      event_details,
      type,
      message,
    });
    await newCustomer.save();

    res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCustomer = async (req, res) => {
  try {
    const customer = await Customer.find().sort({ createdAt: -1 });
    const count = await Customer.countDocuments({ status: false });
    const total = await Customer.countDocuments();
    const newDashboard = await Customer.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({ customers: customer, count: count, total: total, newDashboard: newDashboard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).send({ message: "Customer not found" });

    await Customer.findByIdAndDelete(id);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).send({ message: "Customer not found" });

    await Customer.findByIdAndUpdate(id, {status: true}, { new: true });
    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}