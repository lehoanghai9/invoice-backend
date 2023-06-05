const express = require("express");
const {
  getAllInvoices,
  addInvoice,
  updateInvoice,
  getInvoiceById,
  deleteInvoice,
  updatePaidStatus,
} = require("../controller/InvoiceController");

const router = express.Router();

router.get("/", getAllInvoices);
router.post("/", addInvoice);
router.put("/:id", updateInvoice);
router.put("/status/:id", updatePaidStatus);
router.get("/:id", getInvoiceById);
router.delete("/:id", deleteInvoice);

module.exports = router;
