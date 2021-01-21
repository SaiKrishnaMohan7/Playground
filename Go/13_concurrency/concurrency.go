package main

import (
	"fmt"
	"sync"
	"time"
)

// sync package helps with managing async processes; We can specify how we want something to happen, specify how a set of goroutines will run
var waitGroup sync.WaitGroup

// func say(s string) {
// 	for i := 0; i < 3; i++ {
// 		fmt.Println(s)
// 		time.Sleep(time.Millisecond * 300)
// 	}
// }

func handlePanic() {
	if r := recover(); r != nil {
		fmt.Println("PANIC")
	}
}

func printStuff() {
	// Called on sucess
	defer waitGroup.Done()
	// Called on err
	defer handlePanic()

	for i := 0; i < 3; i++ {
		fmt.Println(i)
		time.Sleep(time.Millisecond * 300)
	}
}

func main() {
	// go routine, threads, async, non-blocking
	// go say("Hello")
	// say("There")

	// adds stuff to a queue
	waitGroup.Add(1)
	go printStuff()
	waitGroup.Wait()

	// We use channels to facilitate communication between go routines
}
