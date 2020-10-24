package main

import "fmt"

func average(numOne, numTwo, numThree float64) (average float64) {
	average = (numOne + numTwo + numThree) / 3

	// Implicitly return average
	return
}

func averageVariadic(nums ...float64) (average float64) {
	var sum float64 = 0.0
	var length = float64(len(nums))

	for _, number := range nums {
		sum = sum + number
	}

	average = sum / length

	return
}

func main() {
	fmt.Println(average(10, 5, 7))
	fmt.Println(averageVariadic(10, 5, 7))
}
