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

## SRC

- [HTTP 1,2,3 in a nutshell](https://start.jcolemorrison.com/http-1-2-and-3-in-a-nutshell/)
