const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const dialogFlowRoutes = require("./routes/dialogFlowRoutes");

app.use(bodyParser.json());

app.use("/api", dialogFlowRoutes);

app.get("/", (req, res) => {
  res.send({ Hello: "There" });
});

app.post("/api/df_text_query", (req, res) => {});

app.post("/api/df_event_query", (req, res) => {});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
