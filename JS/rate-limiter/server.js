const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const configPath = path.join(__dirname, 'config.json');

const tokenBuckets = new Map();

function loadConfig() {
  const config = JSON.parse(fs.readFileSync(configPath));

  config.rateLimitsPerEndpoint.forEach((configObj => {
    const configPerEndpoint = {
        tokens: configObj.burst,
        burst: configObj.burst,
        refillRate: (configObj.sustained / 60),
        lastRefill: Date.now(),
      };
    tokenBuckets.set(configObj.endpoint, configPerEndpoint);
  }));
}

function refillTokens(bucket) {
  const now = Date.now();
  const elapsedTimeInSeconds = (now - bucket.lastRefill) / 1000;
  const tokensToAdd = elapsedTimeInSeconds * bucket.refillRate;

  bucket.tokens = Math.min(bucket.burst, bucket.tokens + tokensToAdd);
  bucket.lastRefill = now;
}

function takeEndpointHandler(req, res) {
  const { endpoint } = req.body;

  if (!endpoint || !tokenBuckets.has(endpoint)) {
    return res.status(400).json({ message: 'Invalid endpoint' });
  }

  const bucket = tokenBuckets.get(endpoint);

  refillTokens(bucket);

  if (bucket.tokens >= 1) {
    bucket.tokens = bucket.tokens - 1;

    return res.json({ accept: true, remainingTokens: Math.floor(bucket.tokens) });
  }

  return res.json({ accept: false, remainingTokens: 0 });
}

app.post('/take/', takeEndpointHandler);

loadConfig();

module.exports = app;