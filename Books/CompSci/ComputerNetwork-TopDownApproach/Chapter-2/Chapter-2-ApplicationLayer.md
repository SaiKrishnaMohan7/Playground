# Chapter 2 Applications Layer

## Network Application Arch

- Application Arch is diff from n/w arch
- Common Archs
  - Client-Server (entire web platform)
    - Always on server
    - relaince on server
    - central authority
    - most apps on the web
  - P2P Arch
    - minimal to no interaction with a server
    - app leverages conn b/w intermittently connected hosts, called peers
    - Many traffic intensive aplications use a P2P arch, like IM apps, central server to recognize and track users but user to user message are sent directly (Skype; Internet telephony services); Another application is peer assisted downloads; Maybe Netflix should use this instead of the CDN in ISP approach
    - Security, performance and reliability challenges

## Processes

- It is processes that talk to each other not programs (programs are processes running in a OS not the converse); Processes running on the same host s/m talk to each other via IPC (Inter Process Comm) governed by the rules of the OS (The same over the n/w would be RPC but goverened by the protocol?)

- The interface b/w the app the n/w is the **socket** (API between app and transport layer)

![SocketAsAPIToTheTransportLayer](/images/SocketAsAPIToTheTransportLayer.png)

- App (process running in the app layer) has limited control over the transport layer
  - What Protocol to use? (TCP, UDP or RTP; Real time protocol)
  - Ability to set max buffer and segment size

### Addressing Processes

- IP: host identifier
- PORT: process identifier

## Transport Layer Services Available to Apps

- Reliable Data Transfer - gauranteed data delivery (TCP)
- Throughput (not provided by internet; applications use smart arch to workaround)
  - rate at which sending process delivers messages to recieving process
  - apps that have definitve throughput reqs are bandwidth-sensitive apps as oppossed to elastic apps that can operate on meager bandwidth
- Timing (not provided by internet; applications use smart arch to workaround) - An upper bound on timing for a message (stream of bits) to appear at the detination (say, in 200ms all bits sent by the sender will reach rxr)
- Security - encryption

![Some apps and their sensitivity](/images/SomeAppsAndBandwidthNeeds.png)

## HTTP

- implemented in two programs, client and server
- WebPage ---1:n---> Objects
  - Objects can be HTML page, img, vid
  - One base HTML pg and several objects referenced by URL
    - URL is composed of
      - host (linkedin.com)
      - object path (/profiles/SaiKrishnaMohan)
- Stateless, forgets what was sent to which client after connecion is terminated; Same object can be sent back if client asks for it in a few sec (cookies are used to store state, recognize clients)
- Nothing to do with how a WebPage is interpreted by a client only how the client gets that info

### Persistent and Non-persistent conenctions

- data tarnsfer over same TCP connection - Persistent
- data tarnsfer over same TCP connection - Non-Persistent
- default - persistent (maybe old)
- 11 TCP connections are generated when a clien requests a web page
  - Most browsers open 5 to 10 parallel TCP connections; All assests required to render a WebPage are fetched in parallel

### HTTP with persistent connection

- Non persistent connections have shortcomings
  - TCP buffer and vars need to be maintained for each requested object by the server, burdensome
- Enter HTTP 1.1
  - Persistent connections with pipelining (send all requests without waiting on response for the prev req) as default; All assets requested are sent over same connection
  - HTTP server closes connection after certain configurable time has passed
- HTTP/2
  - Multiple req and res in the same connection (not 10 parallel connections; not as clear, no practical exp yet...)
  - reqs adn res can be prioritized

### HTTP Request message

![HTTP Req message](/images/HTTPreqMsg)

### HTTP Response Message

![HTTP Res message](/images/HTTPresMsg.png)

### User - Server Interaction - Cookies

- 4 components of the user-server interactions with cookies; Session layer atop stateless HTTP
  - `Cookie` header in HTTP res
  - `Cookie` header in HTTP req
  - cookie file on the client's host managed by browser
  - persistent storage used by the server

![Saving Client/User-Server interaction state with cookies](/images/ClientServerInteractionWithCookies.png)

- ...Post establishing TCP conn.
  - Client sends a HTTP req to the server
  - Server creates a uniqueId and saves it to the db keyed (indexed if relational db) by the uniqueId replies back with `Set-Cookie`: `<uniqueId>`
  - Client browser writes a new line in the cookie file, that it maintains, with the server hostname and the `<uniqueId>` (dated... upon inspection in Chrome, it seems like stuff is stored in cache, localStorage, db and some serviceWorker)

  ...Some long time later...
  - Client makes a req to the same server, this time though, the browser knows the host the user is trying to contact and sets the `Cookie: <uniqueId>` header when sending the req and therefore allowing the server to recognize user
  - As the client continues to browse WebPages, the browser sets `Cookie: <uniqueId>` each time

### Web Caching (Proxy servers, network caches and CDNs)

![Web caching - Proxy servers, network caches and CDNs](/images/WebCachingProxiesNetworkCache.png)

- Proxy servers, network caches and CDNs, same basic concept, cater to a request on behalf of the server
- Typically bought and maintained by ISP (Uni)
- eases congestion of hte access link for smaller ISPs like unis