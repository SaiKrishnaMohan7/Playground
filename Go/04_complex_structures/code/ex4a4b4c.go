package main

import "fmt"

func checkMapMembership(keyValueStore map[string]string, key string) bool {
	_, exists := keyValueStore[key]

	return exists
}

// Go expects this array to be defined the same way, with no size of array defined at init
func average(floatsArr []float64) (average float64) {
	sum := 0.0
	for _, floatValue := range floatsArr {
		sum = sum + floatValue
	}

	average = sum / float64(len(floatsArr))

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

func appendToSlice(arr []string, item ...string) []string {
	newGroceryList := arr

	for _, newGroceryItem := range item {
		newGroceryList = append(newGroceryList, newGroceryItem)
	}

	return newGroceryList
}

func main() {
	// fmt.Println(average(10, 5, 7))
	fmt.Println(averageVariadic(10, 5, 7))

	var scores []float64 = []float64{6, 1.5, 4.5, 7.0, 8}
	fmt.Println(average(scores))

	var animalMap = map[string]string{
		"fido": "dog",
		"blue": "parakeet",
	}

	fmt.Println(checkMapMembership(animalMap, "fido"))

	var groceries []string = []string{"Fruits"}

	fmt.Println(appendToSlice(groceries, "yogurt", "aaloo"))
}
