const express = require("express");
const router = express.Router();
const dialogFlow = require("dialogflow");
const config = require("../config/keys");
const { Storage } = require("@google-cloud/storage");
const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(
  config.googleProjectId,
  config.dialogFlowSessionId
);

router.get("/", async (req, res) => {
  const storage = new Storage();
  try {
    // Makes an authenticated API request.
    const results = await storage.getBuckets();

    const [buckets] = results;

    console.log("Buckets:");
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
    res.send(buckets);
  } catch (err) {
    console.error("ERROR:", err);
  }
});

router.post("/df_text_query", async (req, res) => {
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

  res.send(result);
});

router.post("/api/df_event_query", (req, res) => {});

module.exports = router;
