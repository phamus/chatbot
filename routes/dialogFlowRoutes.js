const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ Hello: "There" });
});

router.post("/api/df_text_query", (req, res) => {});

router.post("/api/df_event_query", (req, res) => {});

module.exports = router;
