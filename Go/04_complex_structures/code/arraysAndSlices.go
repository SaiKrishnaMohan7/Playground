package main

import "fmt"

// Slices in go or maybe even arrays(Check this), will double the memory allocated if full and you want to `append` to it
// NOTE: ^^ in ex4a4b4c.go, the groceryList append function adds to the array BUT the fucntion is pure so I don't know if the statement is true

func arraysAndSlices() {
	var arr [5]int
	// For creating a slice of an array, the memory needs to be allocated beforehand, this is what the
	// `make` method does
	var sliceOfArr []int = make([]int, 5 /*,10 --> the upper limit of what the slice can hold*/)

	arr[0] = 1
	sliceOfArr[0] = 1 // This would keeled over if not initialised with `make` is

	fmt.Println(len(sliceOfArr)) // will return 5
	fmt.Println(cap(sliceOfArr)) // will return 10 which is the max capacity
}

func arraysAndSlicesOne() {
	fruitArray := [5]string{"apple", "banana", "Orange", "gooseberry", "peach"}
	fruitArraySlice := fruitArray[1:3]

	fmt.Println(len(sliceOfArr)) // will return 2
	fmt.Println(cap(sliceOfArr)) // will return 4 since we are starting at index 1 and the original array has 4 more items we could use
}

// func main() {
// 	var bag [5]float64 = [5]float64{6, 1.5, 4.5, 7.0, 8}
// 	// var bag := [5]float64{6, 1.5, 4.5, 7.0, 8}
// 	// Go can automatically infer how many items (more like how much memory to reserve) you want in the array based off of what is on RHS
// 	// var bag := [...]float64{6, 1.5, 4.5, 7.0, 8}

// 	for _, bagItem := range bag {
// 		fmt.Println(bagItem)
// 	}
// }
