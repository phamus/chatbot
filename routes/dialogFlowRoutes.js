const express = require("express");
const router = express.Router();
const dialogFlow = require("dialogflow");
const config = require("../config/keys");

const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(
  config.googleProjectId,
  config.dialogFlowSessionId
);

router.get("/", (req, res) => {
  res.send({ Hello: "There" });
});

router.post("/api/df_text_query", async (req, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: config.dialogFlowSessionLanguageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
});

router.post("/api/df_event_query", (req, res) => {});

module.exports = router;
