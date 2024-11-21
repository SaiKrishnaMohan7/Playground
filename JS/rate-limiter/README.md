# Simple rate limiter

## Overview

This service implements a rate-limiting mechanism based on the Token Bucket algorithm. It provides:
- Burst and sustained limits for each configured route template.
- A `/take/` endpoint to check and consume tokens for a route.

## How It Works

1. **Configuration**: Define rate limits in `config.json`.
2. **Refill Mechanism**: Tokens are refilled at the sustained rate up to the burst limit.
3. **Endpoints**:
   - `POST /take/`: Checks the token availability for a route.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start service
    ```bash
   npm install
   ```
3. Run tests
    ```bash
    npm test
    ```

## Limitations

- Tokens are stored in memory
- No logging and monitoring
- No tracing
- Not setup to run in K8s, readiness and liveness checks have to be implemented
- Graceful handling of errors
- Setup metrics
- Dynamic configuration loading (via and endpoint? OR pull from a secure location)
- More integration tests

---

### **Testing**

1. Start the server: `npm start`.
2. Use `curl` or Postman to interact with the `/take/` endpoint.
3. Run tests using `npm test`.

```bash
curl -X POST http://localhost:3000/take/ \
-H 'Content-Type: application/json' \
-d '{"endpoint": "GET /user/:id"}'
```

---

## Building and running the image (docker)

### Build

`docker build -t rate-limiting-service .`

### Run the container

`docker run -p 3000:3000 -d rate-limiting-service`
