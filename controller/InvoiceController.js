const Invoice = require("../model/Invoice");

const getAllInvoices = async (req, res, next) => {
  let invoice;
  try {
    invoice = await Invoice.find();
  } catch (err) {
    return next(err);
  }
  if (!invoice) {
    return res.status(500).json({ message: "Internal server error" });
  }

  return res.status(200).json({ invoice });
};

const addInvoice = async (req, res, next) => {
  const {
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = req.body;

  let invoice;
  try {
    invoice = new Invoice({
      id,
      createdAt,
      paymentDue,
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status,
      senderAddress,
      clientAddress,
      items,
      total,
    });

    invoice = await invoice.save();
  } catch (error) {
    return next(error);
  }

  if (!invoice) {
    return res.status(500).json({ message: "Unable to save invoice" });
  }
  return res.status(201).json({ invoice });
};

const updateInvoice = async (req, res, next) => {
  const idm = req.params.id;

  const {
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = req.body;

  let invoice;

  try {
    invoice = await Invoice.findOneAndUpdate(
      { id: idm },
      {
        createdAt,
        paymentDue,
        description,
        paymentTerms,
        clientName,
        clientEmail,
        status,
        senderAddress,
        clientAddress,
        items,
        total,
      },
      { new: true }
    );
  } catch (error) {
    return next(error);
  }
  if (!invoice) {
    return res.status(500).json({ message: "Unable to save user" });
  }
  return res.status(200).json({ message: "Updated successfully" });
};

const getInvoiceById = async (req, res, next) => {
  const id = req.params.id;
  let invoice;
  try {
    invoice = await Invoice.findOne({ id: id });
  } catch (error) {
    next(error);
  }
  if (!invoice) {
    return res.status(404).json({ message: "Unable to find such invoice" });
  }
  return res.status(200).json(invoice);
};

const deleteInvoice = async (req, res, next) => {
  const id = req.params.id;
  let invoice;
  try {
    invoice = await await Invoice.findOneAndRemove({ id: id });
  } catch {
    return next(error);
  }
  if (!invoice) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully deleted" });
};

const updatePaidStatus = async (req, res, next) => {
  const id = req.params.id;
  let invoice;

  try {
    invoice = await Invoice.findOneAndUpdate(
      { id: id },
      {
        status: "paid",
      },
      { new: true }
    );

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  } catch (error) {
    next(error);
  }
};

exports.getAllInvoices = getAllInvoices;
exports.addInvoice = addInvoice;
exports.updateInvoice = updateInvoice;
exports.getInvoiceById = getInvoiceById;
exports.deleteInvoice = deleteInvoice;
exports.updatePaidStatus = updatePaidStatus;
