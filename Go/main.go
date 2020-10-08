package main // Package name, every go prog needs a package main

import "fmt" // lib imports

// Main entrypoint of the program; There can be only one main fucntion in a dir
// Only one main function per package main
func main() {
	arg1 := "Shtah"

	fmt.Println("Hello Front End Masters!")
	fmt.Print("Hello Front End Masters!")              // Print vs Println :: no new line vs new line
	fmt.Printf("Hello Front End Masters is %s!", arg1) // String formatting, %s, %c, %d
}
