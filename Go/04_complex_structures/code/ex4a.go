package main

import "fmt"

func average(numOne, numTwo, numThree float32) float32 {
	average = (numOne + numTwo + numThree) / 3

	return average
}

func main() {
	fmt.Println(average(2.2, 3.4, 5.6))
}
