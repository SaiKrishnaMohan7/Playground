package main

import "fmt"

// writing a fucntion
func printAge(age int) int {
	fmt.Println(age)
	return age
}

// When you want to return multiple items from the function
func printAgeAndRandomNum(age int) (int, int) {
	fmt.Println(age)

	// On save, the linter inserted the 0 (default for int type) in the return csv
	return 0, age
}

// When you want to return multiple items from the function and want to name them
func printAgeAndReturnMultipleNamed(age int) (randomVarOne int, randomVarTwo int) {
	// Note: no `var` no := here. This means that somewhere in this fucntion the variables have already
	// been initialized
	// Also, `go` initializes the randomVarOne and randomVarTwo with appropriate default values
	// for that type
	randomVarOne = 23
	randomVarTwo = 31

	// No need to specifically return randomVarOne and randomVarTwo
	// Implicit return
	return
}

// ages is a collection! We can iterate
// Notice no return, void fucntion concept?
func printAgeVariadic(ages ...int) {

	for _, value := range ages {
		fmt.Println(value)
	}
}

func main() {
	printAge(8)
	printAgeAndRandomNum(4)
	fmt.Println(printAgeAndReturnMultipleNamed(4))
	// age1, age2 := printAgeAndReturnMultipleNamed(4)
	printAgeVariadic(12, 13, 79)
}
