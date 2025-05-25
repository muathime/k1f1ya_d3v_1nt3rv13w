const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const kycRoute = require("./routes/kyc");
const transactionRoute = require("./routes/transaction");
const transactionsRoute = require("./routes/transactions");
const logger = require("./middleware/logger");

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173", //my fe is running on :5173
//     credentials: true,
//   })
// );

app.use(cors()); // I have allowed all

app.use(bodyParser.json());
app.use(logger);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/kyc", kycRoute);
app.use("/transaction", transactionRoute);
app.use("/transactions", transactionsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
