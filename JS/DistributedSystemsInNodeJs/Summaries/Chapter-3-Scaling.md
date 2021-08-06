# Chapter-3 Summary by Sai; Book Thomas Hunter II

- 2 reasons for running redundant copies of an application
  - High Availability (HA)
  - Throughput
    - depending on hardware basic node app can cater to 40K req/s; Serializing and deserializing payloads or any other CPU intensive work bring that number down by a lot

- **Cluster Module**
  - Run redundant copies of the same service on the same machine (think one container running multiple processes), dispatching incoming network messages to the copies
  - Provides a mechanism for routing requests to copies
    - similar to `child_process` module, `fork()` method to spawn process
  - Almost never the best tool to scale a process

- **Reverse Proxy**
  - Aceepts incoming req and fowards to the server and vice-versa
  - Layer 4 (Transport) or Layer 7 (Application)
  - Req dispatching commonly round robin
  - Can be used to
    - clean up/reject malformed HTTP requests
    - random or based off of sessionID (HTTP URL) or cookie (sticky session)
    - TLS encryption and gzip compression
  - HAProxy (works by creating frontend - it listens and forwards to backend - hosts and ports), NGINX (res caching), Traefik, Kong Gateway

- **TLS Termination**
  - Doing it in a centralized location is better for CPU utilization (app deosn't need to worry about it) and certs can be at one place
  - `.pem` file contains content feom bot `.cert` and `.key` files

- Back pressure: consuming service has its requests queued up

- **SLA and Load Testing**
  - Contractual requirements - Service Level Agreement (SLA)
  - Individual objectives in an SLA (promises certain level of fucntion of a service, ex: Our service will have a latency of 100ms) - Service Level Objectives (SLO)
  - Real values a service is achieving (ex: Our service has a latency of 83ms) - Service Level Indicators (SLI); Think of SLO as numerator and SLI as denominator, from the examples then this would be 100/83!
    - SLA : SLO :: 1 : n
    - SLO : SLI :: 1 : n
    - SLA ---1-n---> SLOs ---1-n---> SLIs
  - Choosing an env that mocks prod for load testing is a good approach
  - TP99, Top percentile 99, means min time 99% of the requests were served. This and p90 are good indicators of how the service is performing and engineers should take these into account over average
