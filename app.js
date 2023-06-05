require('dotenv').config();  
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/InvoiceRouter");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/api", router);

mongoose
  .connect(
    `mongodb+srv://hyperminister:${process.env.DATABASE_PASS}@cluster0.4dosgir.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => app.listen(5000, () => console.log("conncted tesom")))
  .catch((error) => console.log(error));
