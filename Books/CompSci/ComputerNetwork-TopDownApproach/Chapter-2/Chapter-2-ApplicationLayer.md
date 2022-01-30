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

![SocketAsAPIToTheTransportLayer](images/SocketAsAPIToTheTransportLayer.png)

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

![Some apps and their sensitivity](images/SomeAppsAndBandwidthNeeds.png)

## HTTP

- implemented in two programs, client and server
- WebPage : Objects :: 1 : n
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

![HTTP Req message](images/HTTPreqMsg.png)

### HTTP Response Message

![HTTP Res message](images/HTTPresMsg.png)

### User - Server Interaction - Cookies

- 4 components of the user-server interactions with cookies; Session layer atop stateless HTTP
  - `Cookie` header in HTTP res
  - `Cookie` header in HTTP req
  - cookie file on the client's host managed by browser
  - persistent storage used by the server

![Saving Client/User-Server interaction state with cookies](images/ClientServerInteractionWithCookies.png)

- ...Post establishing TCP conn.
  - Client sends a HTTP req to the server
  - Server creates a uniqueId and saves it to the db keyed (indexed if relational db) by the uniqueId replies back with `Set-Cookie`: `<uniqueId>`
  - Client browser writes a new line in the cookie file, that it maintains, with the server hostname and the `<uniqueId>` (dated... upon inspection in Chrome, it seems like stuff is stored in cache, localStorage, db and some serviceWorker)

  ...Some long time later...
  - Client makes a req to the same server, this time though, the browser knows the host the user is trying to contact and sets the `Cookie: <uniqueId>` header when sending the req and therefore allowing the server to recognize user
  - As the client continues to browse WebPages, the browser sets `Cookie: <uniqueId>` each time

### Web Caching (Proxy servers, network caches and application caches)

![Web caching - Proxy servers, network caches](images/WebCachingProxiesNetworkCache.png)

- Proxy servers, network caches, same basic concept, cater to a request on behalf of the server
- Typically bought and maintained by ISP (Uni)
- eases congestion of hte access link for smaller ISPs like unis

#### Conditional GET

- Cached object maybe stale, if so, get from server
  - HTTP Method should be GET
  - `If-modified-since:` header line is included
- Think about normal interaction with web server, hits a cache a miss happens
  - Cache sends req to server, server responds with `Last-Modified:` header set
  - Cache forwards res to client and saves the object locally with the `Last-Modified:` header
  - When same object requested after a while, couple of days, the cache checks with server if objected saved locally is cached by setting the `If-modified-since: <valueOf Last-ModifiedHeader FromWhenCacheRequestedObjFromServer>`
    - if not stale, server responds with `304 Not Modified` with no body (so way quicker), the cache responds with the saved obj to the client
    - if stale then the usual thing happens

## DNS - Domain Name System

- Is a distributed DB implemented as:
  - A hierarchy of servers, Domain Name Servers
  - App layer protocol that determines rules to access the info on the DB
    - DNS protocol runs over UDP, port 53 (query and reply messages are inside UDP Datagrams), running Berkley Internet Name Domain (BIND)
      - DNS protocol is also implemented as a client-server application with the client side running on teh user's host and the server side on a DNS server
      - When the user tries to access a WebPage on some server, the browser extracts the hostname and passes it to the client side of DNS which then contacts a DNS server to get the IP address of the server
      - Once IP is received, and passed to the application, our TCP handshake story begins
    - **DNS uses UDP for queries and replies and TCP for Zone tansfer** (maintaining consistency of RRs across Primary and Secondary servers -- Authoritative servers?)
- Other than hostname to IP translation, DNS provides follwing services:
  - **_Hostname Aliasing_**
    - Most hostnames that we encounter today are mnemonic, easier to remember (have a sort of ring to it), these are called **Alias Hostnames**
    - A host can have more than 1 Alias hostname that point to a **Canonical Hostname**
      - say _us-east-1.relay.cloud.spicycurry.com_ is the canonical hostname that _spicycurry.com_ and _www.spicycurry.com_ point to
    - DNS can be invoked to get the canonical hostname and the IP address of the server
  - **_Mail Server Aliasing_**
    - Web server and mail server can have the same Alias hostname (MX record)
  - **_Load Distribution_**
    - In the real world we have replicated webservers (multiple pods, containers or VMs), each with its own IP address
    - DNS can cycle through (round robin) these IP addresses when replying to the client DNS of the user host
- Interesting this: [mDNS](https://en.wikipedia.org/wiki/Multicast_DNS); maybe this is how my iphone is able to play music on WiFi connected speaker. Maybe when we enable Local Network for an app like Spotify, some sort of muliticast query action happens and the IP of the speaker is known for streaming music? Maybe...

### A distributed, hierachical database

- DNS is distributed as all app layer protocols and hence is not implemented as single server
  - if it were
    - Single point of failure
    - Cannot serve millions queries
    - Maintanance pains
    - Too far geographically, too many hops, delays
- Hence, implemented as a hierarchy of servers distributed geographically
- Three classes of DNS (very similar to TLS certs)
  - Root DNS servers
    - >= 400 around the world
    - Provides IPs of TLD DNS servers
  - Top-level Domain (TLD) DNS servers
    - .com, .net, .edu, .in, .gov, .jp, .ca
    - Provides IPs of TLD servers Authoritative DNS servers
  - Authoritative DNS servers (Type A RRs)
    - Any publically accessible hosts on the internet must provide DNS records that map to the IPs of those hosts
    - Primary and Secondary back ups usually
  - Local DNS (not a class)
    - More of a proxy between the client DNS and the DNS server
    - Institutional and residential ISPs install them
    - When host hits up ISP, IP (assigned via DHCP) of one of these is returned
    - Typically close to the host, on the same LAN in the case of unis
    - host to localDNS queries are recursive, typically and there on out, iterative

  ![DNS Hierarchy](images/DNSHierarchy.png)
- The flow
  - Client DNS contacts Root DNS server that returns the IP of the TLD DNS server
  - Client contacts TLD DNS server that returns IP of Authoritative DNS server
  - Client contacts Authoritative DNS server that returns the IP of the web server of interest pertaining to the query
  - TCP handshake story...

  ![DNS Flow](images/DNSFlow.png)
- **_DNS Caching_**
  - When a host queries a DNS server and the DNS responds with the IP matching the hostname, the DNS server saves that information with itself with a TTL (Time To Live) of 2 days
  - If the another host queries the DNS server for the same hostname/IP pair, the DNS server immediatley returns that info even it is not the authoritative DNS for that hostname
  - Can also cache IPs of TLD DNS servers, thereby avoiding hop to root DNS
- **_DNS Records and Messages_**
  - The hierarchical DNS servers implementing a distributed db hold *Resource Records (RR)*
    - Each DNS reply contains 1 : n RRs
  - RR is a 4 tuple `(Name, Value, Type, TTL)`
    - TTL - When a RR is to be expunged from a cache
    - *Name, Value, Type*
      - if `Type=A` then `Name=hostname` and `Value=IPaddrOfHost`
        - ex: `(us-east.relay1.spicycurry.com, 145.34.45.368, A, <TTL>)`
      - if `Type=NS` then `Name=domain` and `Value=hostnameOfAuthoritativeDNS`, used to route queries along the chain
        - ex: `(foo.com, dns.foo.com, NS, <TTL>)`
      - if `Type=CNAME` then `Name=AliasHostname` and `Value=CanonicalHostname`
        - ex: `(bar.com, relay1.bar.com, CNAME, <TTL>)`
      - if `Type=MX` then `Name=AliasHostname` and `Value=CanonicalHostnameOfMailServer`
        - Allows for having the same alias name for the web server and mail server
        - To get mail server IP, DNS query would be for the MX record and a CNAME query for web server IP, for the same alias name (From the client's PoV, it is asking for IP of foo.com but how does DNS know if MX record is desired or CNAME record is desired?)
        - ex: `(foo.com, mail.foo.com, MX, <TTL>)`
  - If DNS server authoritative for a hostname will contain Type A RR for hostname (may contain Type A hostname if not authoritative, in cache)
  - If not authoritative will contain Type NS RR and will also contain Type A RR with IP of DNS server as Value (multiple replies being returned)
- **_DNS Mesages_**
  - Queries and Replies same packet format

  ![DNS Packet](images/DNSPacket.png)

  - Header section - 12bytes
    - first field - 16 bit query idnetifier (copied to reply to a query so that client can match queries to corresponding replies)
    - Flags - 1 bit
      - query or reply
      - authoritative or not
      - recursion desired
      - recursion-available (reply)
  - Question section
    - Name being queried
    - what Type of RR
  - Answer Section
    - RR for Name queried
    - can be multiple (replicated web servers)
  - Authority section
    - RR of Authoritative servers
  - Additional section
    - Say a reply has the CNAME of a mail server, additional may contain Type A RR for the same
- `nslookup` play around
- **_DNS Record Insertion_**
  - UPDATE is possible to dynamically update an RR
  - Registrar - checks uniqueness of domain name
    - Give them the IP of Primary and Secondary authoritative servers for each of which a Type NS record and Type A record are for the authoritative servers created by them
    - You create Type A or Type MX (if mail server aliased to the same CNAME as Web server) record in the authoritative servers
- DNS is quite secure, with packet filtering, caching most DDoS attacks are prevented

## Peer to Peer Networks

------NotDeepEnoughInBook------

- _**BitTorrent**_
  - Most pervasive
  - Torrent - Set of all peers distributing a file
    - Peers download files in equal sized chunks of 256 KB
    - File is chunked and each peer has a subset
    - Connection between peers is over TCP
  - Tracker - central infra for peers to register with, advertise themselves intermittently after registeration
  - _Working_
    - A peer in a network requests for the _rarest_ chunk of the file, _rarest first_
      - To distribute rare chunks as quickly as possible within the torrent and roughly equalize the numChunks
    - Trading Algo
      - Neighbors supplying data at the highest bit rate are favoured and peer reciprocates by exchanging data at the same rate
      - Every 10s, set of neighbors recalculated favouring above (peers are uncoked)
      - Every 30s, new neighbor is picked at random and chunks are shared (optimistically unchoked)
- [Distributed Hash Tables (DHT)](https://mediaplayer.pearsoncmg.com/_ph_cc_ecs_set.title.Distributed_Hash_Tables_(DHTs)_(Chapter_2)__/aw/streaming/ecs_kurose_compnetw_6/DHT.m4v)
  - CDNs implement a DHT

## Video Streaming and CDNs

- HTTP streaming flaw
  - Stream the same video/file of same quality to all clients irrespective of bandwidth available to them
    - DASH - Dynamic Adaptive Streaming over HTTP
      - Several encode versions of files available to client at different quality; client can request different version more appropriate for the bandwidth availabile to teh client based on the manifest file (bit-rate to URL mapping) sent to client by server
        - The client requests files in chunks, say when trying to req chunks at teh beginning (0:0:00 to 0:2:00) of a video the available bandwidth is not high, the client requests the video encode for lower bit rate say 340p. Allows for clients to request a diff file if bandwidth changes during the session
- **CDNs** implements a DHT
  - Problems solved by CDN
    - Client is far away from the server, end to end throughput governed by bottleneck of the link
    - Same popular video will be requested several times
    - single data center single point of failure
  - Multiple copies of file in geographically distributed locations, server routes clients to CDNs that will ensure the best quality for its users
  - _CDN server placement philosophy_
    - Enter Deep
      - Place CDN servers deep in the access networks of  ISPs (Akamai)
      - Higher cost to maintain but higher throughput to end users
    - Bring Home
      - Large cluster at a smaller number placed a Internet Exchange Points (IXP)
      - Lower maintainance lower throughput to end users
    - CDNs are populated by either pulling from or being pushed to from a central repository
      - If client requests a video not stored at that CDN server, it gets it form the cntral repo or another CDN server
      - Locally stores data
      - When storage full deletes data that is not as frequently requested
- **CDN Working**
  - When a host requests a vid
    - CDN needs to intercept the req (Take advantage of DNS and redirect req; DNS redirect) and determine which CDN server cluster to redirect req to

    ![DNS Working](images/DNSWorking.png)

    1. The user visits the Web page at NetCinema
    2. When the user clicks on the link `http://video.netcinema.com/6Y7B23V`, the user’s host sends a
      DNS query for video.netcinema.com
    3. The user’s Local DNS Server (LDNS) relays the DNS query to an authoritative DNS server for
      NetCinema, which observes the string “video” in the hostname video.netcinema.com. To “hand over” the DNS query to KingCDN, instead of returning an IP address, the NetCinema authoritative DNS server returns to the LDNS a hostname in the KingCDN’s domain, for example, _a1105.kingcdn.com_
    4. From this point on, the DNS query enters into KingCDN’s private DNS infrastructure. The user’s
      LDNS then sends a second query, now for _a1105.kingcdn.com,_ and KingCDN’s DNS system eventually returns the IP addresses of a KingCDN content server to the LDNS. It is thus here, within the KingCDN’s DNS system, that the CDN server from which the client will receive its content is specified.
    5. The LDNS forwards the IP address of the content-serving CDN node to the user’s host.
    6. Once the client receives the IP address for a KingCDN content server, it establishes a direct TCP connection with the   server at that IP address and issues an HTTP GET request for the video. If DASH is used, the server will first send to the client a manifest file with a list of URLs, one for each version of the video, and the client will dynamically select chunks from the different versions

  - _Cluster Selection Strategies_
    - Dynamically driecting clients to a CDN server cluster within the CDN by learning the IP of client's LDNS from the DNS query
    - Geographically closest strategy, LDNS IP mapped to geographic location
      - may perform poorly for some clients as there maybe too many hops in-between
        - realtime measurements of loss and delay can be used to workaround but many LDNSs are configured to not respond to such probes

  - _Google infra_
    - 14 mega data centres, server search results and Gmail messages (also a PWA)
    - Bring Home CDNs 50 - 100 servers, their own
    - 100+ Enter Deep clusters, employs TCP splitting, serves static content for WebPage results of a search query
    - When a user makes a serach query, req goes to nearby Enter Deep ISP CDNs retrieving static content for the results
      - The req is also forwarded to Google's private network to fetch personalized search results
    - For YouTube, when a video is resquested, video itslef may come from a Bring Home CDN while static assests coming from a Bring Home CDN and ads from Google's private data centres

  - _Netflix Infra_
    - Major components: AWS and its own private CDN (doesn't use DNS redirect instead service running on AWS directs client which DNS server cluster to fetch from)
      - AWS
        - **Content Ingestion**
          - Ingest and process studio master versions of videos
        - **Content Processing**
          - AWS machines create multiple formats at various bit rates for various clients that Netflix serves. This is then served over DASH
        - **Uploading Versions to CDN**
          - Post processing, hosts push to CDN servers

        ![Netflix Infra Action](images/NetflixInfraAction.png)

    - Uses Bring Home and Enter Deep philosophies for their private CDN; Akamai CDN for WebPages, static assets
    - Content pushed to CDN (no pull), during off hours; only popular ones, calculated everyday
    - When user clicks a video tile on one of the clients, req goes to AWS that determines which CDN server has movie and if the user host is served by a residential ISP network
      - Once that is known then, req forwarded to one of the Bring Home or Enter Deep CDNs
      - Client and CDN directly talk to each other using a properitary version of DASH
        - Client makes byte-range requests to get a 4s long file chunk
          - While chunk is being downloaded, client measures throughput by running a rate determination algo to decide what encoded chunk, suitable for available badnwidth is to be requested
          - _byte range requests_: (MDN)
            - Can be done only if server accepts these req; A HEAD method call helps with that
              - if server accepts, it replies with `Accept-Ranges: bytes`  header set in the reply
              - When client reqs a chunk, `206 Partial Content` returned from server alongwith `Content-Range: <requestedChunkRage>/<TotalBytesOnServer>` and `Content-Length: 1024`
  - _YouTube Infra_
    - Uses pull caching
    - Optimizes Round Trip Time (RTT) as cluster selection strategy
    - Also employs DNS redirect to a distant CDN to balance load
    - Doesn't use DASH, user manually changes quality
    - Byte-range req used to limit flow of data after a preset amount of video is prefetched
  - _Kankan Infra_
    - Uses CDN-P2P hybrid model (peer assited download) for content delivery
    - Content pushed to CDN that plays a huge roll in initial start-up of stream, remainder of chunks pulled from peers
      - Once data downloading from peers (numPeers with chunks meets a certain number and isActive) reaches a certain threshold, CDN is not relied upon anymore
