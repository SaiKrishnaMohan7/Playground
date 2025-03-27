package main

import (
	"log"
	"net"
	"time"
)

func doSomethingWithClientConnection(conn net.Conn) {
	defer conn.Close()
	var buf []byte= make([]byte, 1024)

	// This is at the socket level
	_, err := conn.Read(buf) // Read is also blocking
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Processing request")
	// do some work
	time.Sleep(8 * time.Second) // simulate work
	conn.Write([]byte("HTTP/1.1 200 OK\r\n\r\n Hello from server!\r\n")) // Write is also blocking
}

func main() {
	// reserve a port 42069 on the machine
	listner, err := net.Listen("tcp", ":42069")

	if err != nil {
		log.Fatal(err) // never do this in prod
	}

	// server doesn't quit after reqplying
	// Also, this is a single threaded server
	// It can only handle one client at a time
	// It will block on the first client connection
	// It will only move on to the next client connection after the first client is done
	for {
		log.Println("Waiting for client connection")
		conn, err := listner.Accept() // this is blocking and will only move on if a cli connects
		if err != nil {
			log.Fatal(err)
		}

		log.Println("Client connected")

		// This is how multithreaded servers are built
		go doSomethingWithClientConnection(conn)
	}
}
