# Chapter-1 Summary by Sai; Book Thomas Hunter II

- Open Systems Interconnect (OSI) model - Concept describing relationship between different network protocols

  |Layer   	|Name   	|Ex   	|
  |---	|---	|---	|
  |8   	|*User*  loosey goosey here 	|gRPC, JSON, GraphQl   	|
  |7   	|Application   	|HTTP, WebSocket   	|
  |6   	|Presentation   	|MIME, ASCII, TLS   	|
  |5   	|Session   	|Sockets   	|
  |4   	|Transport   	|TCP, UDP   	|
  |3   	|Network   	| IP, ICMP, BGP, DHCP  	|
  |2   	|Data Link   	|MAC, LLC   	|
  |1   	|Physical   	|Ethernet, IEEE 802.11   	|

- **Req and Res with HTTP**
  - Text based protocol atop TCP, delivery guaranteed, ordering guranteed
    - `It's kind of like playing a board game (TCP) and then making another set of rules on top of it (HTTP). i.e. given a pair of dice, blank cards, and a board (TCP) we can make up another set of rules and play monopoly (HTTP)`
  - Dictates more what should be in `Header` v/s What should the `Body` look like? (*layer 8* protocols use this to advantage)
  - Protocol for transferring *hypermedia*, ex: images, HTML docs
  - **TCP Protocol**
    - Communication with accuracy
    - `If I send it, I'll make sure you've gotten it even if I have to stop the world...you'll get it. That or I'll die trying.`
  - **UDP Protocol**
    - `I'll send it, I don't care if you get it. But if you do get it, it'll be way faster.`
  - Versions
    - *HTTP 1.0*:
      - new TCP connection for EVERY req/res
    - *HTTP 1.1*:
      - "keep alive" (`keep-alive` Header) the same TCP connection for every req/res, but each req/res must still be sent serially
      - Modern browsers need to send multiple requests/responses in parallel (i.e. sending CSS/JS in parallel), they bypass this ^^ limitation by making multiple TCP connections
      - Defeats the point of HTTP/1.1 and makes "keep alive" more like "walking dead."
    - *HTTP 2*:
      - *ONE TCP* connection, multiple req/res in parallel!
      - Since TCP can't tell the difference between any given req/res and is paranoid about sending everything accurately. Therefore if one data packet goes missing, everything comes to a halt until that packet is resent (*TCP Head of Line Blocking*). This means you could have 3 files being sent, and packet loss on one file will hold up all 3 from transmitting. In networks with "high" packet loss (2%), HTTP/2 can be slower than HTTP/1.1
    - *HTTP 3*:
      - HTTP protocol re-implemented on top of the QUIC protocol (which is on top of UDP). This means parallel req/res without the "head of line blocking" problem. This means faster requests/responses in general.
      - *QUIC*
        - Protocol built on top of UDP
        - Cajoles UDP to start checking if things are actually sent and received
      - *QUIC Streams*
        - Using a single UDP connection, send parallel requests/responses! It can tell the difference between the parallel requests/responses. This means that if one req/res experiences packet loss, the others aren't stopped.

- **HTTP Semantics**
  - *HTTP methods*
  - *Idempotency*
    - If the result of an operation is unknown (network failure or something) it is safe for client to try again
  - *Status Codes*
    - text following the number (200 OK) is called Reason Phrase. HTTP/2 omits this, only code
  - *Client versus Server errors*
    - `400 - 499`: Client messed up
    - `500 - 599`: Server messed up
  - *Response Caching*
    - Only responses get cached, typically successsful GETs
      - if error code, don't cache
    - *How long a response should be cached?*
      - `Expires` header
  - *Statelessness*
    - Every request has enough info to set desired state
    - There are ways to simulate state (appears like it has state) over HTTP
      - `Cookie` header and setting a unique session identifier in db

- **HTTP Compression**
  - *Only compresses **BODY** of request*, only part of header that is touched is setting `Content-Length`
    - Not a pain point when it comes to service to service comm, that can work with a finite set (subset) of HTTP headers
    - In browser land, headers can be few kilobytes, not ideal (think yucky tracking cookies)
      - HTTP/2 solves this by using HPACK to compress headers as well (this reason and parallel req/res is why HTTP/2 was invented)
  - Client supports compression?
    - use `Accept-Encoding` header to choose which algo (gzip, most common, there's also brotli)
    - server encounters ^ header, compresses response using algo specified, sets `Content-Encoding` (gzip or br for brotli) header and sends it back
  - *Compression is a teade-off between payload size and CPU usage*
    - Node is not the best for compression, CPU heavy, don't do it in the application server; Solution: Reverse-Proxy (automatically handles compression)
    - `gzip` works by removing redundancy in response bodies

- **HTTPS/TLS**
  - used for encrypting HTTP traffic
  - encrypts headers too!
  - CPU intensive, do not do this in app server, Reverse Proxy is better suited
  - replaces SSL (Secure Sockets Layer)

## SRC

- [HTTP 1,2,3 in a nutshell](https://start.jcolemorrison.com/http-1-2-and-3-in-a-nutshell/)
