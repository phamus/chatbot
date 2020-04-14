const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const dialogFlowRoutes = require("./routes/dialogFlowRoutes");

app.use(bodyParser.json());

app.use("/api", dialogFlowRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
