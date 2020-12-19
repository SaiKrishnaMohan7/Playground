package main

// To import custom local packages, the full filepath from root workspace is to be given
// The entire pacjage can be aliased to a single shorter variable for ease of use (utils "Playground/Go/05_toolkit/code/utils.go")
// Or when using it can also be accessed by the package name
import (
	"Playground/Go/05_toolkit/code/utils"
	"fmt"
)

func main() {
	fmt.Println(utils.Add(1, 2, 3))
}
